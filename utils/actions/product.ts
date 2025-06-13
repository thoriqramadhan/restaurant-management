"use server";

import { sql } from "../neon";
import { supabaseServer } from "../supabase";


export async function addProduct(formData: FormData) : Promise<{status: number , msg: string}>{
  const { productName, productPrice, category, imgInput } = Object.fromEntries(
    formData
  ) as {
    productName: string;
    productPrice: string;
    category: string;
    imgInput: File;
  };
  const filePath = `products/${imgInput.name}`
  const {error:imgError} = await supabaseServer.storage.from('oms').upload(filePath, imgInput ,{ upsert: true})
  if(imgError) return {status: 400 , msg: imgError.message}
  const {data , error: signUrlError } = await supabaseServer.storage.from('oms').createSignedUrl(filePath , 60 * 60 * 24 * 365)
  if(!data) return {status: 400 , msg: signUrlError.message}
  await sql.query('INSERT INTO products(name , price , category , product_url) VALUES ($1 ,$2 ,$3, $4)' , [productName , Number(productPrice) , category , data.signedUrl])

  return {status: 200 , msg: 'Success adding product!'}
}
