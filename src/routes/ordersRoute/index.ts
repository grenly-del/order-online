import {Router} from 'express'
import { PostOrder } from '../../controllers/orders'
import ProductsRoute from './products'

const route = Router()


route.use('/products', ProductsRoute)

route.post('/', PostOrder)



export default route