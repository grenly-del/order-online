import {Router} from 'express'
import { LoginPost } from '../../controllers/auth'

const route = Router()

route.post('/', LoginPost)

export default route