/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'

declare global {
    declare namespace Express {
        interface Request {
            decodedToken: string
        }
    }
}
