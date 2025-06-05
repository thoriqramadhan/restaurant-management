import nodemailer from 'nodemailer'
import { z } from 'zod'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'jovani.schroeder16@ethereal.email',
        pass: process.env.ETHEREAL_PASS,
    }
})

interface VerrifyEmailResponse {
    success: boolean,
    message?: string
}
export async function sendVerifyEmail(toEmail:string , verifyToken: string): Promise<VerrifyEmailResponse>{
    console.log(toEmail);
    
    if(!z.string().email().safeParse(toEmail).success){
        return {
            success: false,
            message: 'Invalid email'
        }   
    }
    await transporter.sendMail({
        from: '"jovani RMW" <jovani.schroeder16@ethereal.email>',
        to: toEmail,
        subject: 'Verify your email - Restaurant Management Web',
        text: 'use this link bellow to verify your email',
        html: `<b>use this link bellow to verify your email</b> <a href='http://localhost:3000/verify/${verifyToken}'>${verifyToken}</a>`
    })
    return {
        success: true,
        message: 'Email sent'
    } 
}