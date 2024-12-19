import express from 'express'
import cors from 'cors'
import { connectToDB } from 'db'
import { checkSchema } from 'express-validator'
import { signUpSchema } from 'server/controllers/utils/validation/signUpSchema'
import { signUp } from 'server/controllers/auth/signUp'

async function startExpressServer() {
    const app = express()
    const port = process.env.PORT ?? '4001'

    const corsOptions = {
        origin: `http://localhost:${port}`
    }

    app.use(cors(corsOptions))
    app.use(express.json())

    app.post('/signUp', checkSchema(signUpSchema), signUp)

    try {
        await connectToDB()
        app.listen(port, () => {
            console.log(`🚀 Server ready at http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

void startExpressServer()
