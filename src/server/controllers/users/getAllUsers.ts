import type { Request, Response } from 'express'
import { User } from 'db/models/user'

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll()

        if (users.length === 0) {
            res.status(500).json({
                message: 'No users found!'
            })
            return
        }

        const result = users.map(({ id, firstName, lastName, email }) => ({
            id,
            firstName,
            lastName,
            email
        }))

        res.status(200).json(result)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ name: err.name, message: err.message })
            return
        }
        res.status(500).json({ message: 'Unknown error!' })
    }
}
