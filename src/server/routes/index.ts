import { authRouter } from './auth'
import express from 'express'

export const router = express.Router()

router.use('/auth', authRouter)
