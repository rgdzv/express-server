import { Request, Response } from 'express'
import { User } from 'db/models/user'
import { RequestBody } from '../types/signUpTypes'
import bcrypt from 'bcryptjs'
import { getErrorMessage } from '../utils/getErrorMessage/getErrorMessage'
import jwt from 'jsonwebtoken'

export const signIn = async (
    req: Request<object, object, RequestBody>,
    res: Response
) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email }
        })

        if (!user) {
            res.status(500).json({
                message: 'There is no user with that email!'
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

        const result = { user, token }

        res.status(200).json(result)
    } catch (err) {
        res.status(500).json(getErrorMessage(err))
    }
}
