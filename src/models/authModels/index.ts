import mongoose, {Schema, model} from 'mongoose'



const UserSchema = new Schema({
    id_pengguna: {
        type: String,
        required: true
    },
    nama_pengguna: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: false
    }
})


export default model('user', UserSchema)