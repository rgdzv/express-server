import express from 'express'
import { verifyPermission } from '../middlewares/verifyPermission'
import { verifyAuth } from '../middlewares/verifyAuth'
import { getAdminInfo } from '../controllers/users/getAdminInfo'
import { usersRouter } from './users'
import { authRouter } from './auth'

export const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.get('/admin', [verifyAuth, verifyPermission], getAdminInfo)
