import { SignUpTemp } from '@/types/redis'
import { sql } from '@/utils/neon'
import { getRedisClient } from '@/utils/redis'
import { notFound, redirect } from 'next/navigation'
import bcrypt from 'bcrypt'

export default async function Page({
  params,
}: {
  params: Promise<{ verifyToken: string }>
}) {
  const {verifyToken: token} = await params
  const redisClient = getRedisClient()
  if(token.length <= 0) {
    return notFound()
  }
  const isTokenValid = (await redisClient.json.get(`signuptemp:${token}`)) as SignUpTemp | null
  
  if(!isTokenValid) {
    return notFound()
  }else{
    const {email , name , password}  = isTokenValid
    await sql.query('INSERT INTO users (name, email, password , "emailVerified" , role) VALUES ($1, $2, $3 , NOW() , $4)', [name, email, bcrypt.hashSync(password, 10) , 'customer']) 
    redisClient.destroy()
  }

  redirect(`/signin?token=${token}`)
}
