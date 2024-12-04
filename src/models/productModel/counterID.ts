import {Schema, model} from 'mongoose'

const counterSchema = new Schema({
    prefix: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
});

export default model('counter', counterSchema);