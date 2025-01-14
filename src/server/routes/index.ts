import express from 'express'
import { authRouter } from './auth'
import { usersRouter } from './users'
import { verifyPermission } from '../middlewares/verifyPermission'
import { verifyAuth } from '../middlewares/verifyAuth'
import { getAdminInfo } from '../controllers/users/getAdminInfo'

export const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/admin', [verifyAuth, verifyPermission], getAdminInfo)
