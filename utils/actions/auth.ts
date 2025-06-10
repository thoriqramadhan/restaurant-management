'use server'
import { signIn } from "next-auth/react";
import { z } from "zod";
import { signJwtToken } from "../jwt";
import { getRedisClient } from "../redis";
import { sendVerifyEmail } from "../nodemailer";

export async function signInAuth(FormData: FormData){
    const {email, password} = Object.fromEntries(FormData) as Record<string, string>
    await signIn('credentials' , {redirect: false, email, password})
}
export async function signUpAuth(FormData: FormData){
    try {
        const {name , email, password} = Object.fromEntries(FormData) as Record<string, string>
        const schema = z.object({
            name: z.string().min(3, 'Name is required'),
            email: z.string().min(1, 'Email is required').email('Invalid email'),
            password: z.string().min(3, 'Password is required').min(8, 'Password must be at least 8 characters'),
        })
        // validate input
        const validationRes = schema.safeParse({name, email, password})
        
        if(!validationRes.success){
            return  validationRes.error.issues
        }
        const timenow = new Date().getTime()
        // get verifytoken
        const verifyToken = (await signJwtToken({...Object.fromEntries(FormData),timenow})) as string
        const redisClient = getRedisClient()
        redisClient.json.set(`signuptemp:${verifyToken}`,'$', {token: verifyToken , ...Object.fromEntries(FormData)})
        await redisClient.expire(`signuptemp:${verifyToken}`, 3600)
        // send verify email
        const verifyResponse = await sendVerifyEmail(email , verifyToken)
        if(verifyResponse.success === false) return
        // create account in db
        // await sql.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3 )', [name, email, bcrypt.hashSync(password, 10)])
    } catch (error) {
        console.log('SignUpError : ' + error);
        
    }
}
export async function verifyEmail(token: string){
    try {
        const redisClient = getRedisClient()
        const payload = await redisClient.json.get('signuptemp:'+token)
        redisClient.destroy()
        console.log(payload);
    } catch (error) {
        console.log(error);
    }
}