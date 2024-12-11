import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { SECRET } from "../../config";
import { HTTP_STATUS_CODE } from "../../config/httpsCode";
export const CheckTokenValid = (req:Request, res:Response, next:NextFunction) => {
    const header = req.headers
    console.log('header middleware')

    // Token dari User Client
    const token:string | undefined = header.authorization?.split(' ')[1]

    // Decoded Token
    if(token && SECRET.JWT_SECRET_KEY) {
        jwt.verify(token, SECRET.JWT_SECRET_KEY, (err, data) => {
            if(err) {
                throw err
            }else {
                req.userId = (data as JwtPayload).userId
                
                next()
            }
        })
    }else {
        res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
            message: 'Tidak memiliki akses'
        })
    }
}