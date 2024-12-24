import express from 'express'
import cors from 'cors'
import { router } from 'server'
import { connectToDB } from 'db'

function startExpressServer() {
    const app = express()
    const port = process.env.PORT ?? '4001'
    const clientURL = process.env.CLIENT_URL ?? 'http://localhost'
    const corsOrigin = `${clientURL}:${port}`

    const corsOptions = {
        origin: corsOrigin,
        credentials: true
    }

    app.use(cors(corsOptions))
    app.use(express.json())

    app.use('/api', router)

    try {
        app.listen(port, () => {
            console.log(`🚀 Server ready at http://localhost:${port}`)
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Server launch failed due to this error: ${error}`)
        }
    }
}

void connectToDB()
startExpressServer()
