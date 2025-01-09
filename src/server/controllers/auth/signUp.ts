import { Request, Response } from 'express'
import { User } from 'db'
import { RequestBody } from '../types/signUpTypes'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { generateTokens } from '../../services/token-service'

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

        const tokens = generateTokens({
            id: user.id ?? '',
            email: user.email
        })

        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        })

        res.status(200).json(tokens)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
