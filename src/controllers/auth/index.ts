import { Request, Response } from "express"
import UsersModel from '../../models/authModels'
import OTPEmailModel from '../../models/authModels/otpEmail'
import { userSchema, userType } from "../../config/validations/users"
import { HTTP_STATUS_CODE } from "../../config/httpsCode"
import { GenereteID } from "../../utils/genereteID"
import { sendEmail } from "../../config/email"
import bcrypt from 'bcrypt'


export const RegisPost = async (req:Request, res:Response) => {
    // melakukan validasi
    const result = userSchema.safeParse(req.body)
    if(result.success) {
       try {

           
           
           // Lanjutkan dengan membuat ID_Pengguna
           const id = await GenereteID("US")
          
           const newPasswordHash = bcrypt.hashSync(result.data.password, 10)
            // Simpan di database data user
           const newUser = await new UsersModel({
                id_pengguna: id,
                nama_pengguna: result.data.nama_pengguna,
                email: result.data.email,
                password: newPasswordHash,
                role: result.data.role,
                status: false
            }).save()

            // Send Email OTP
            const otpRandom = Math.floor(Math.random()*9999-1000 + 1) + 1000
            sendEmail(result.data.email, otpRandom)

            // Membuat ExpireDate
            const expireDate = new Date()
            expireDate.setMinutes(expireDate.getMinutes()+1) // 1 Menit Expire OTP
            // Simpan OTP sesuai dengan ID Pengguna
            await new OTPEmailModel({
                otp_code: otpRandom,
                user_id: newUser._id,
                expiresAt: expireDate
            }).save()

            // Kirim Response Berhasil
            res.status(HTTP_STATUS_CODE.CREATED).json({
                message: 'Berhasil mendaftarkan email',
                email: result.data.email
            })
       } catch (error) {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
                message: 'Gagal',
                error: error
            })
       }

    }else {
        console.log(result.error)
        // Berikan response Error
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
            message: "Gagal",
            error: result.error
        })
    }
}





export const GetOTPEmail = async (req:Request, res:Response) => {

    // Ambil User Berdasarkan Email
    console.log(req.body)
    const Users = await UsersModel.findOne({email: req.body.email})
    console.log(Users)
    if(Users == null) {
        console.log('first')
        res.status(HTTP_STATUS_CODE.NOT_FOUND).json({message: "Gagal", error: 'Email tidak ditemukan'})
    }else {
        
        // Send Email OTP
        const otpRandom = Math.floor(Math.random()*9999-1000 + 1) + 1000
        sendEmail(req.body.email, otpRandom)
    
        // Membuat ExpireDate
        const expireDate = new Date()
        expireDate.setMinutes(expireDate.getMinutes()+1) // 1 Menit Expire OTP
        // Simpan OTP sesuai dengan ID Pengguna

        await new OTPEmailModel({
            otp_code: otpRandom,
            user_id: Users._id,
            expiresAt: expireDate
        }).save()

        res.status(HTTP_STATUS_CODE.OK).json({message: 'Berhasil'})
    }
    

}

export const CekOTPEmail = async (req:Request, res:Response) => {
    try{
        const data = req.body
        const otp_email = Number(data.otp_email)
        const UserOTPValid = await OTPEmailModel.findOne({otp_code: otp_email})
        if(!UserOTPValid) {
            res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
                message: 'Gagal',
                data: "OTP tidak valid"
            })
        }else {
            const newUsers = await UsersModel.findOneAndUpdate({_id: UserOTPValid?.user_id}, {$set : {status: true}},  { new: true })
            console.log(newUsers)
            await OTPEmailModel.findOneAndDelete({user_id: newUsers?._id})
            res.send('berhasil')
        }
    }
    catch(err) {
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({message: 'gagal', error: err})
    }
}

export const LoginGet = (req:Request, res:Response) => {
    res.send('login')
}