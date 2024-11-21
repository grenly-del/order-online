import {Router} from 'express'
import { PostOrder } from '../../controllers/orders'

const route = Router()

route.post('/', PostOrder)



export default route