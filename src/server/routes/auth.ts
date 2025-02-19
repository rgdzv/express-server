import express from 'express'
import { checkSchema } from 'express-validator'
import { signUpSchema } from '../controllers/utils/validation/signUpSchema'
import { signUp } from '../controllers/auth/signUp'
import { signIn } from '../controllers/auth/signIn'
import { signInSchema } from '../controllers/utils/validation/signInSchema'
import { verifyAuth } from '../middlewares/verifyAuth'
import { signOut } from '../controllers/auth/signOut'

export const authRouter = express.Router()

authRouter.post('/signUp', checkSchema(signUpSchema), signUp)
authRouter.post('/signIn', checkSchema(signInSchema), signIn)
authRouter.post('/signOut', verifyAuth, signOut)
