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
export async function editCategory(
  formData: FormData
): ActionResponse {
  const { name ,oldname } =
    Object.fromEntries(formData) as {
      name: string;
      oldname: string
    };
  try {
    // create products
    z.string().min(3).parse(name)
    await sql.query('UPDATE categories set name = $1 WHERE name = $2' , [name.toLowerCase() , oldname.toLowerCase()])
  } catch (error) {
    return { status: 400, msg: `Failed editing category : ${error}` };
  }
  // await sql.query('INSERT INTO products(name , price , category , img_id) VALUES ($1 ,$2 ,$3, $4)' , [productName , Number(productPrice) , category , img.id])

  return { status: 200, msg: "Success editing category!" };
}
export async function deleteCategory(
  formData: FormData
): ActionResponse {
  const { name } =
    Object.fromEntries(formData) as {
      name: string;
    };
    
  try {
    // create products
    await sql.query('DELETE FROM categories WHERE name = $1' , [name.toLowerCase()])
  } catch (error) {
    return { status: 400, msg: `Failed deleting category : ${error}` };
  }
  // await sql.query('INSERT INTO products(name , price , category , img_id) VALUES ($1 ,$2 ,$3, $4)' , [productName , Number(productPrice) , category , img.id])

  return { status: 200, msg: "Success deleting category!" };
}