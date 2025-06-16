import { SignUpTemp } from "@/types/redis";

export async function verifyToken(token:string) : Promise<{status: number}>{
    try {
        const res = await fetch('/api/verify' , {
            method: 'POST',
            body: JSON.stringify({token})
        })
        console.log(res);
        
        return res
    } catch (error) {
        return {status: 400}
    }
}
export async function getTokenFromRedis(token:string) : Promise<{status: number , data?: SignUpTemp}>{
    try {
        const res = await fetch(`/api/verify?token=${token}` , {
            method: 'get',
        })
        if(res.status != 200) throw new Error('Token is invalid!')
        return {status: 200 , data: await res.json() as SignUpTemp}
    } catch (error) {
        return {status: 400}
    }
}

export async function deleteTokenFromRedis(token:string) : Promise<{status: number}>{
    try {
        const res = await fetch(`/api/verify?token=${token}`, {
            method: 'delete',
        })
        if(res.status!= 200) throw new Error('Token is invalid!')
        return {status: 200}
    } catch (error) {
        return {status: 400}
    }
}