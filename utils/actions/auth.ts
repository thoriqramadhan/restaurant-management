'use server'
import { signIn } from "next-auth/react";
import { z } from "zod";
import { sql } from "../neon";
import bcrypt from 'bcrypt'
import { signJwtToken } from "../jwt";
import { redisClient } from "../redis";

export async function signInAuth(){
    await signIn('credentials' , )
}
export async function signUpAuth(FormData: FormData){
    const {name , email, password} = Object.fromEntries(FormData) as Record<string, string>
    const schema = z.object({
        name: z.string().min(3, 'Name is required'),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z.string().min(3, 'Password is required').min(8, 'Password must be at least 8 characters'),
    })
    const validationRes = schema.safeParse({name, email, password})
    
    if(!validationRes.success){
        return  validationRes.error.issues
    }
    const verifyToken = await signJwtToken({...Object.fromEntries(FormData)})
    await redisClient.connect()
    redisClient.json.set(`signuptemp:${verifyToken}`,'$', {token: verifyToken , ...Object.fromEntries(FormData)})
    
    // await sql.query('INSERT INTO users (name, email, password , "emailVerified") VALUES ($1, $2, $3 , NOW())', [name, email, bcrypt.hashSync(password, 10)])
}