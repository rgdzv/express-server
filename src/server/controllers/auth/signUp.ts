import { Request, Response } from 'express'
import { User } from 'db'
import { RequestBody } from '../types/signUpTypes'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

export const signUp = async (
    req: Request<object, object, RequestBody>,
    res: Response
) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array()
            })
            return
        }

        const candidate = await User.findOne({
            where: { email: req.body.email }
        })

        if (candidate) {
            res.status(500).json({
                message: 'This email is already registered!'
            })
            return
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            roles: req.body.roles
        })

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET ?? '',
            {
                expiresIn: '30d'
            }
        )

        res.status(200).json({ token })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
