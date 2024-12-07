import {Router} from 'express'
import { LoginGet } from '../../controllers/auth'

const route = Router()

route.get('/', LoginGet)

export default route