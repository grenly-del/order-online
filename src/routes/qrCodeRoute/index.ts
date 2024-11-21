import {Router} from 'express'
import { GenereteQrCode } from '../../controllers/qrCode'
const route = Router()

route.get('/generete-qr-code/:meja', GenereteQrCode)

export default route