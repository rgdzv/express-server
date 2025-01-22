import type { Request, Response } from 'express'

export const signOut = (req: Request, res: Response) => {
    try {
        res.clearCookie('refreshToken')

        res.status(200).json({ message: 'You have been signed out!' })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
