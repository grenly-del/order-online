import nodemailer from 'nodemailer'

const transportMail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'snakeeys070@gmail.com', // Ganti dengan email Anda
        pass: 'qedj fqgw egea ipmv', // Ganti dengan password email Anda (gunakan App Password untuk Gmail)
      },
})


export const sendEmail = async (email:string, otp:number):Promise<void>=> {
    const messageOption = {
        from: 'snakeeys070@gmail.com', // Ganti dengan nama dan email Anda
        to: email,
        subject: 'Enter your OTP', // Format teks
        html: `<p>Your OTP is: <b>${otp}</b></p>`,
    }


    try{
        // Kirim email OTP
        await transportMail.sendMail(messageOption)
    }catch(err) {
        throw err
    }
}


