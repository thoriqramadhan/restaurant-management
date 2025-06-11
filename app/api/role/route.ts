import { User } from "@/types/database";
import { sql } from "@/utils/neon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const email = searchParams.get('email')
        if(!email) return NextResponse.json('Invalid Payload', {status: 400})
        const userDbResponse = (await sql.query('SELECT * FROM users WHERE email = $1', [email])) as User[]
        if(userDbResponse.length === 0) return NextResponse.json('Email is not registered!' , {status: 404})
        const role = userDbResponse[0].role
        return NextResponse.json({role} , {status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json(error , {status: 400})
    }
}