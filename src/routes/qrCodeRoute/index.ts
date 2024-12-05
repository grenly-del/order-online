import {Router} from 'express'
import { GenereteQrCode, getAllQRCode } from '../../controllers/qrCode'
const route = Router()

route.get('/generete-qr-code/', getAllQRCode)
route.post('/generete-qr-code/:meja', GenereteQrCode)

export default route