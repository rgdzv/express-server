import { Request, Response } from 'express'
import { User } from 'db'
import { RequestBody } from '../types/signUpTypes'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

export const signIn = async (
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

        const user = await User.findOne({
            where: { email: req.body.email }
        })

        if (!user) {
            res.status(500).json({
                message: 'Invalid email or password!'
            })
            return
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )

        if (!isPasswordValid) {
            res.status(500).json({
                message: 'Invalid email or password!'
            })
            return
        }

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

        const userResInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        const result = { user: userResInfo, token }

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
