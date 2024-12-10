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
    },
    expiresAt: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

// Otomatis hapus data setelah Expired
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default model('otp', OTPSchema)