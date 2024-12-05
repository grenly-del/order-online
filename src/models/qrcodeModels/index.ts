import {Schema, model} from 'mongoose'

const QRCodeDataSchema = new Schema({
    nomor_meja: {
        type: Number,
        required: true,
        unique: true
    },
    url_qrcode: {
        type:String,
        required: true,
        unique: true
    }
})


export default model('qrcode', QRCodeDataSchema)