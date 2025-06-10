import bcrypt from 'bcryptjs'
import { getRedisClient } from './redis'
import { SignUpTemp } from '@/types/redis'
export async function checkPasswordCorrect(passDb: string , passInput: string){
    const isPasswordCorrect = await bcrypt.compare(passInput , passDb)
    // const isPasswordCorrect = await bcrypt.hash(passInput , 10)
    return isPasswordCorrect
}

// export async function checkTokenValid(token:string) : Promise<SignUpTemp | null>{
//     const redisClient = getRedisClient()
//     const isTokenValid = (await redisClient.json.get(`signuptemp:${token}`)) as SignUpTemp | null
//     return isTokenValid
// }