import type { Request, Response } from 'express'

export const getAdminInfo = (req: Request, res: Response) => {
    try {
        res.status(200).json('Admin content!')
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
