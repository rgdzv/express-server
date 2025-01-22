import { User } from 'db'
import type { NextFunction, Request, Response } from 'express'

export const verifyPermission = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findOne({
            where: { email: req.user.email }
        })

        if (!user) {
            res.status(403).json({
                message: `You don't have access to this page!`
            })
            return
        }

        if (!user.roles.includes('admin')) {
            res.status(403).json({
                message: `You don't have access to this page!`
            })
            return
        }

        next()
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
