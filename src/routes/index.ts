import {Router} from 'express'

import routeOrder from './ordersRoute'
import routeQrCode from './qrCodeRoute'
import routeAuth from './authRoute'
const route = Router()

route.use('/orders', routeOrder)
route.use('/qrcode', routeQrCode)
route.use('/auth', routeAuth)


export default route