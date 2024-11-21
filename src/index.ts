import express, {Request, Response} from 'express'
import {APPS, DB} from './config'
import {HTTP_STATUS_CODE} from './config/httpsCode'
const app = express()
import { connectDB } from './models/connectedDB'
import cors from 'cors'
import helmet from 'helmet'
import RoutesApp from './routes'
import path from 'path'


// Connect to Database
connectDB()


// Middleware 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(helmet())
app.use(express.static('public'));


app.get('/', async (req:Request, res:Response) => {
   res.json({
    status: HTTP_STATUS_CODE.FORBIDDEN,
    message: 'No Authentication'
   })
})


app.use('/api', RoutesApp)






// Config
const port = APPS.PORT || 4000

app.listen(port, () => {
    console.log(`server is running to port ${port}`)
})