import express from 'express'
import { checkSchema } from 'express-validator'
import { signUpSchema } from '../controllers/utils/validation/signUpSchema'
import { signUp } from '../controllers/auth/signUp'
import { signIn } from '../controllers/auth/signIn'

export const router = express.Router()

router.post('/signUp', checkSchema(signUpSchema), signUp)
router.post('/signIn', signIn)
