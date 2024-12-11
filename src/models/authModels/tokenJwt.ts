import {Schema, model} from 'mongoose'

const JWTSchema = new Schema({
    token_jwt: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})


export default model('token', JWTSchema)
