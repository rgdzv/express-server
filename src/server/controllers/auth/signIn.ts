import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { User } from 'database'
import { generateTokens } from '../../services/token-service'
import type { RequestBody } from '../types/signUpTypes'
import type { Request, Response } from 'express'

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

        const tokens = generateTokens({
            id: user.id ?? '',
            email: user.email
        })

        res.cookie('refreshToken', tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        })

        const userInfo = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        res.status(200).json({ user: userInfo, tokens })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
