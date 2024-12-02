import express, { Request, Response } from 'express'
import cors from 'cors'

async function startExpressServer() {
    const app = express()
    const port = process.env.PORT || 4001
    const corsOptions = {
        origin: `http://localhost:${port}`
    }

    app.use(cors(corsOptions))
    app.use(express.json())

    try {
        app.listen(port, () => {
            console.log(`🚀 Server ready at http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }

    app.get('/', (req: Request, res: Response) => {
        res.send('Success!')
    })

    app.post('/login', (req, res) => {
        console.log(req.body)
        res.json({ success: true })
    })
}

startExpressServer()
