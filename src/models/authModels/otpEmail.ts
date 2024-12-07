import mongoose, {Schema, model} from 'mongoose'


const OTPSchema = new Schema({
    otp_code: {
        type: Number,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

export default model('otp', OTPSchema)