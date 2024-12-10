import {Router} from 'express'
import RegisRoute from './regis'
import LoginRoute from './login'
import { GetOTPEmail } from '../../controllers/auth'

const route = Router()

route.post('/getotp', GetOTPEmail)

route.use('/regis', RegisRoute)
route.use('/login', LoginRoute)

export default route