export async function verifyToken(token:string) : Promise<{status: number}>{
    try {
        const res = await fetch('/api/verify' , {
            method: 'POST',
            body: JSON.stringify({token})
        })
        return res
    } catch (error) {
        return {status: 400}
    }
}