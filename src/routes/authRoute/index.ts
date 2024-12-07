import {Router} from 'express'
import RegisRoute from './regis'
import LoginRoute from './login'

const route = Router()

route.use('/regis', RegisRoute)
route.use('/login', LoginRoute)

export default route