"use server";

import { sql } from "../neon";
import { supabaseServer } from "../supabase";

export type ActionResponse = Promise<{ status: number; msg: string }>

async function getImgId(existingImgId?: string , imgInput?:File){
  let imgId = (existingImgId != '0' )? existingImgId : null
    // if didnt use existing img
    
    // create new img if existing is null & imgInput is available
    if (!imgId && imgInput?.size != 0) {
      if(!imgInput) throw new Error('Img input required!')
      // create file path
      const filePath = `products/${imgInput.name}`;
      // upload img to bucket
      await supabaseServer.storage.from("oms").upload(filePath, imgInput);
      // get signed url
      const { data, error: signUrlError } = await supabaseServer.storage
        .from("oms")
        .createSignedUrl(filePath, 60 * 60 * 24 * 365);
      // on signed error throw error   
      if (signUrlError)
        throw new Error("Error creating signed url", {
          cause: signUrlError.message,
        });
      // create new image col and returning id 
      const imageResult = await sql.query("INSERT INTO images(path , img_url) VALUES($1 , $2) RETURNING id", [
        filePath,
        data?.signedUrl,
      ]);
      // set img id
      imgId = imageResult[0].id
    }
    return imgId
}
export async function addProduct(
  formData: FormData
): ActionResponse {
  const { productName, productPrice, category, imgInput, existingImgId } =
    Object.fromEntries(formData) as {
      productName: string;
      productPrice: string;
      category: string;
      imgInput?: File;
      existingImgId?: string;
    };
  try {
    await sql`BEGIN`;
    // img id for products
    
    const imgId = await getImgId(existingImgId , imgInput)
    // create products
    await sql.query('INSERT INTO products(name , price , category , img_id) VALUES ($1 ,$2 ,$3, $4)' , [productName.toLowerCase() , Number(productPrice) , category.toLowerCase() , imgId])
    await sql`COMMIT`
  } catch (error) {
    console.log(error);
    // error rollback
    return { status: 400, msg: `Failed adding product : ${error}` };
    await sql`ROLLBACK`;
  }
  // await sql.query('INSERT INTO products(name , price , category , img_id) VALUES ($1 ,$2 ,$3, $4)' , [productName , Number(productPrice) , category , img.id])

  return { status: 200, msg: "Success adding product!" };
}

export async function deleteProduct(data: FormData) : ActionResponse {
  const {productName} = Object.fromEntries(data) as {productName:string}
  try {
    await sql.query('DELETE FROM products WHERE name = $1' , [productName.toLowerCase()])
    return {status: 200 , msg: "Success Deleting Products : " + productName}
  } catch (error) {
    console.log(error);
    return {status: 400 , msg: `Error deleting product : ${error}`}
  }
}
export async function editProduct(formData: FormData) : ActionResponse {
  const { oldName, productName, productPrice, category, imgInput, existingImgId } =
  Object.fromEntries(formData) as {
      oldName: string;
      productName: string;
      productPrice: string;
      category: string;
      imgInput?: File;
      existingImgId?: string;
    };
    console.log( oldName, productName, productPrice, category, imgInput, existingImgId);
    
  try {
     await sql`BEGIN`;
    // img id for products
    
    const imgId = await getImgId(existingImgId , imgInput)
    await sql.query('UPDATE products SET name = $1 , price = $2 , category = $3 , img_id = $4 WHERE name = $5' , [productName , productPrice , category , imgId , oldName])
    return {status: 200 , msg: "Success Editing Products : " + productName}
  } catch (error) {
    console.log(error);
    // error rollback
    await sql`ROLLBACK`;
    return { status: 400, msg: `Failed editing product : ${error}` };
  }
}
