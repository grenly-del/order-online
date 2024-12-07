import {Router} from 'express'
import { RegisPost } from '../../controllers/auth'

const route = Router()

route.post('/', RegisPost)

export default route