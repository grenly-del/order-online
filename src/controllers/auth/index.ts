import { Request, Response } from "express"
import UsersModel from '../../models/authModels'
import OTPEmailModel from '../../models/authModels/otpEmail'
import { userSchema, userType } from "../../config/validations/users"
import { HTTP_STATUS_CODE } from "../../config/httpsCode"
import { GenereteID } from "../../utils/genereteID"
import { sendEmail } from "../../config/email"


export const RegisPost = async (req:Request, res:Response) => {
    // melakukan validasi
    const result = userSchema.safeParse(req.body)
    if(result.success) {
       try {

           
           
           // Lanjutkan dengan membuat ID_Pengguna
           const id = await GenereteID("US")
          
            // Simpan di database data user
           const newUser = await new UsersModel({
                id_pengguna: id,
                nama_pengguna: result.data.nama_pengguna,
                email: result.data.email,
                password: result.data.password,
                role: result.data.role,
                status: false
            }).save()

            // Send Email OTP
            const otpRandom = Math.floor(Math.random()*9999-1000 + 1) + 1000
            sendEmail(result.data.email, otpRandom)

            // Simpan OTP sesuai dengan ID Pengguna
            await new OTPEmailModel({
                otp_code: otpRandom,
                user_id: newUser._id
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


export const LoginGet = (req:Request, res:Response) => {
    res.send('login')
}