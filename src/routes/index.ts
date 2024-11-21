import {Router} from 'express'

import routeOrder from './ordersRoute'
import routeQrCode from './qrCodeRoute'
const route = Router()

route.use('/orders', routeOrder)
route.use('/qrcode', routeQrCode)


export default route