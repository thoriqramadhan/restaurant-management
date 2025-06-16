"use server";

import { sql } from "../neon";
import { supabaseServer } from "../supabase";

export async function addProduct(
  formData: FormData
): Promise<{ status: number; msg: string }> {
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
    
    let imgId = (existingImgId != '0' )? existingImgId : null
    // if didnt use existing img
    
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
