import express, {Request, Response} from 'express'
import {APPS, DB} from './config'

const app = express()
import { connectDB, connection } from './models/connectedDB'

connectDB()


app.get('', async (req:Request, res:Response) => {
    const [result, fields] = await connection.query('SHOW DATABASES')
    console.log(result)
    res.send('Hello World')
})






// Config
const port = APPS.PORT || 4000
const env = APPS.ENV

const dbHost = DB.DB_HOST
const dbPort = DB.DB_PORT
app.listen(port, () => {
    console.log(`server is running to port ${port}`)
})