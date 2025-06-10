import { SignUpTemp } from '@/types/redis'
import { sql } from '@/utils/neon'
import { getRedisClient } from '@/utils/redis'
import { notFound, redirect } from 'next/navigation'
import bcrypt from 'bcrypt'

interface PageProps {
  params: {
    verifyToken: string
  }
}
export default async function Page({params} : PageProps) {
  const token = await params.verifyToken
  const redisClient = getRedisClient()
  if(token.length <= 0) {
    return notFound()
  }
  const isTokenValid = (await redisClient.json.get(`signuptemp:${token}`)) as SignUpTemp | null
  
  if(!isTokenValid) {
    return notFound()
  }
  redisClient.destroy()
  const {email , name , password}  = isTokenValid
  await sql.query('INSERT INTO users (name, email, password , "emailVerified") VALUES ($1, $2, $3 , NOW() )', [name, email, bcrypt.hashSync(password, 10)]) 

  redirect(`/signin?token=${token}`)
}
