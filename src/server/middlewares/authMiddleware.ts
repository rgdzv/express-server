import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const bearerToken = authHeader.split(' ')

        if (
            bearerToken.length == 2 &&
            bearerToken[0].toLowerCase() == 'bearer'
        ) {
            jwt.verify(
                bearerToken[1],
                process.env.JWT_SECRET ?? '',
                function (error, decodedToken) {
                    if (error) {
                        res.status(401).json({
                            message: 'Invalid authorization token'
                        })
                        return
                    }

                    req.decodedToken = decodedToken as string
                    next()
                }
            )
        } else {
            next()
        }
    } else {
        next()
    }
}
