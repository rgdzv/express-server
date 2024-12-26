/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import { JwtPayload } from 'jsonwebtoken'

declare global {
    declare namespace Express {
        interface Request {
            user: string | JwtPayload
        }
    }
}
