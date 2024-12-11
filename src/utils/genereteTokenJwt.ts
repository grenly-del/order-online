import jwt from 'jsonwebtoken'
import { SECRET } from '../config'

export const genereteToken = async (userId:string) => {
    const token = await jwt.sign({userId},  SECRET.JWT_SECRET_KEY, {expiresIn: '1d'})
    return token
}
