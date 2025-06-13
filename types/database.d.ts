export interface User{
    id: number,
    name: string,
    email: string,
    emailVerified: Date,
    image?: string | null,
    role?: string | null,
    password: string
}
export interface Product{
    id: number,
    name: string,
    price: number,
    category: string,
    product_url: string
}
export interface Category{
    name: string
}