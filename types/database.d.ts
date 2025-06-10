export interface User{
    id: number,
    name: string,
    email: string,
    emailVerified: Date,
    image?: string | null,
    role?: string | null,
    password: string
}