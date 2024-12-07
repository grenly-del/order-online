import {Schema, model} from "mongoose";
import { OrderType, ListPesananType } from "../../config/validations/order";

const listPesananSchema = new Schema<ListPesananType>({ 
    nama_pesanan: String,
    harga_pesanan: Number,
    jumlah_pesanan: Number,
    jenis_pesanan: String
})

const OrderSchema = new Schema<OrderType>({
    nama_pelanggan: {
        type: String,
        required: true
    },
    list_pesanan: {
        type: [listPesananSchema],
        required: true
    },
    total_harga: {
        type: Number,
        required: true
    }
})

export default model<OrderType>('order', OrderSchema)