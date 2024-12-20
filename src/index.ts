import express from 'express'
import cors from 'cors'
import { authRouter } from 'server'
import { connectToDB } from 'db'

async function startExpressServer() {
    const app = express()
    const port = process.env.PORT ?? '4001'

    const corsOptions = {
        origin: `http://localhost:${port}`
    }

    app.use(cors(corsOptions))
    app.use(express.json())

    app.use('/auth', authRouter)

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
