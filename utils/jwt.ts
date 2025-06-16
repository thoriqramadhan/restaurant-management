import {JWTPayload, SignJWT} from 'jose'
const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET)
export async function signJwtToken(payload: JWTPayload | undefined){
    return new SignJWT(payload).setProtectedHeader({alg: 'HS256'}).sign(jwtSecret)
}