import { checkTokenValid } from "@/utils/validate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){
    const body = req.body
    const {token} = body
    if(!token) return NextResponse.json('Token is required!' , {status: 400})
    const isTokenValid = await checkTokenValid(token)
    if(!isTokenValid) return NextResponse.json('Token is invalid!' , {status: 404})
    return NextResponse.json('Token is valid' , {status:200})
}