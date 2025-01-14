import express from 'express'
import { getAllUsers } from '../controllers/users/getAllUsers'
import { verifyAuth } from '../middlewares/verifyAuth'

export const usersRouter = express.Router()

usersRouter.get('/', verifyAuth, getAllUsers)
