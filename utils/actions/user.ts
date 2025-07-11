'use server'
import { Role } from "@/types/database";
import { ActionResponse } from "./product";
import { sql } from "../neon";
import bcrypt from "bcryptjs";

export async function addUsers(formData: FormData) : Promise<ActionResponse>{
    try {
        const {name ,role , password , email} = Object.fromEntries(formData) as {name:string , role?:Role , password:string , email: string}
        const hashedPassword = await bcrypt.hash(password , 10)
        await sql.query('INSERT INTO users(name , email , "emailVerified" , role , password) VALUES($1 ,$2 , NOW(), $3 , $4)' , [name.toLowerCase() , email , role , hashedPassword])
        return {status: 200 , msg: 'Success adding users'}
    } catch (error) {
        return {status: 400 , msg: 'Failed adding users : ' + error}
    }
    
}