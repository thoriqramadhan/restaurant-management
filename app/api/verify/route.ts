import { SignUpTemp } from "@/types/redis";
import { getRedisClient } from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json()
    const {token} = body
    if(!token) return NextResponse.json('Token is required!' , {status: 400})
    const redisClient = getRedisClient()
    const isTokenValid = (await redisClient.json.get(`signuptemp:${token}`)) as SignUpTemp | null
    if(!isTokenValid) return NextResponse.json('Token is invalid!' , {status: 404})
    return NextResponse.json('Token is valid' , {status:200})
}
export async function GET(req: NextRequest ){
    const {searchParams} = new URL(req.url)
    const token = searchParams.get('token')

    if(!token) return NextResponse.json('Token is required!' , {status: 400})
    const redisClient = getRedisClient()
    const isTokenValid = (await redisClient.json.get(`signuptemp:${token}`)) as SignUpTemp | null
    if(!isTokenValid) return NextResponse.json('Token is invalid!' , {status: 404})
    return NextResponse.json(isTokenValid , {status:200})
}
export async function DELETE(req: NextRequest){
    const {searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    if(!token) return NextResponse.json('Token is required!', {status: 400})
    const redisClient = getRedisClient()
    await redisClient.del(`signuptemp:${token}`)
    return NextResponse.json('Token deleted!', {status: 200})
}