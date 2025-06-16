import { Category, ImageDB, Product } from "@/types/database";
import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL ?? '');

// products
export async function getAllProductDB(): Promise<Product[]>{
    try {
        return (await sql.query('SELECT products.id , products.name , products.price , products.category , images.img_url AS product_url FROM products LEFT JOIN images ON(products.img_id=images.id)')) as Product[]
    } catch (error) {
        console.log(error);
        return []
    }
}
// category
export async function getAllCategoryDB(): Promise<Category[]>{
    try {
        return (await sql.query('SELECT * FROM categories')) as Category[]
    } catch (error) {
        console.log(error);
        return []
    }
}
// Images
export async function getAllExistingProductImgsDB(): Promise<ImageDB[]>{
    try {
        return (await sql.query("SELECT * FROM images WHERE path LIKE 'products/%'")) as ImageDB[]
    } catch (error) {
        console.log(error);
        return []
    }
}