/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface JwtPayloadWithUser extends JwtPayload {
    id: string
    email: string
}

declare global {
    declare namespace Express {
        interface Request {
            user: JwtPayloadWithUser
        }
    }
}
