import { getAllProductDB} from "@/utils/neon";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const products = await getAllProductDB()
        return NextResponse.json(products , {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json('Failed to get products' , {status: 400 , statusText:'Failed to get products'})
    }
}