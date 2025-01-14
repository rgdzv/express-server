import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayloadWithUser } from 'declarations/express'

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization

        if (!authorizationHeader) {
            res.status(401).json({
                message: 'You are not authorized!'
            })
            return
        }

        const bearerToken = authorizationHeader.split(' ')

        if (
            bearerToken.length !== 2 ||
            bearerToken[0].toLowerCase() !== 'bearer' ||
            !bearerToken[1]
        ) {
            res.status(401).json({
                message: 'You are not authorized!'
            })
            return
        }

        const userData = jwt.verify(
            bearerToken[1],
            process.env.JWT_ACCESS_SECRET ?? ''
        ) as JwtPayloadWithUser | undefined

        if (!userData) {
            res.status(401).json({
                message: 'You are not authorized!'
            })
            return
        }

        req.user = userData

        next()
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
