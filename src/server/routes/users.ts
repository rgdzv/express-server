import express from 'express'
import { getAllUsers } from '../controllers/users/getAllUsers'
import { verifyAuth } from '../middlewares/verifyAuth'
import { verifyPermission } from '../middlewares/verifyPermission'
import { getAdminInfo } from '../controllers/users/getAdminInfo'

export const usersRouter = express.Router()

usersRouter.get('/', verifyAuth, getAllUsers)
usersRouter.get('/admin', [verifyAuth, verifyPermission], getAdminInfo)
