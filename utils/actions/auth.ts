import { signIn } from "next-auth/react";

export async function signInAuth(){
    await signIn('credentials' , )
}
export async function signUpAuth(FormData: FormData){
    const {name , email, password} = Object.fromEntries(FormData);
    console.log(name , email , password);
    
}