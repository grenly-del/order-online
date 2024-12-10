import {Router} from 'express'
import RegisRoute from './regis'
import LoginRoute from './login'
import { CekOTPEmail, GetOTPEmail } from '../../controllers/auth'

const route = Router()

route.post('/getotp', GetOTPEmail)
route.post('/cekotp', CekOTPEmail)

route.use('/regis', RegisRoute)
route.use('/login', LoginRoute)

export default route