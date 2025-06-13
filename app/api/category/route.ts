import { Product } from "@/types/database";
import { sql } from "@/utils/neon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const products = (await sql.query('SELECT * FROM categories')) as Product[]
        return NextResponse.json(products , {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json('Failed to get products' , {status: 400 , statusText:'Failed to get products'})
    }
}