export async function fetchJS(input:string | URL | globalThis.Request  , init?: RequestInit ) : Promise<Response>{
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${input}` , init)
}