import {Schema, model} from 'mongoose'

const ProductSchema = new Schema({
    id_produk: {
        type: String,
        required: true,
        unique: true
    },
    nama_produk: {
        type: String,
        required: true,
        unique: true
    },
    harga_produk: {
        type: Number,
        required: true
    },
    stok_produk: {
        type: Number,
        required: true
    },
    stok_terjual: {
        type: Number,
        required: true
    },
    jenis_produk: {
        type: String,
        required: true
    },
    image_produk: {
        type:String,
        required: false
    }
})


export default model('product', ProductSchema)