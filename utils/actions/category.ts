"use server"

import { z } from "zod";
import { sql } from "../neon";
import { ActionResponse } from "./product";

export async function addCategory(
  formData: FormData
): ActionResponse {
  const { name } =
    Object.fromEntries(formData) as {
      name: string;
    };
  try {
    // create products
    z.string().min(3).parse(name)
    await sql.query('INSERT INTO categories(name) VALUES ($1)' , [name.toLowerCase()])
  } catch (error) {
    return { status: 400, msg: `Failed adding category : ${error}` };
  }
  // await sql.query('INSERT INTO products(name , price , category , img_id) VALUES ($1 ,$2 ,$3, $4)' , [productName , Number(productPrice) , category , img.id])

  return { status: 200, msg: "Success adding category!" };
}