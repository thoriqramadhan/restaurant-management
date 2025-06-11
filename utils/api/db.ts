import { Role } from "@/components/context/RoleContext";
import { fetchJS } from "../fetch";

interface GetRoleResponse {
    role: Role
}
export async function getRole(email: string) : Promise<{status: number , role?: GetRoleResponse , msg?: string}>{
    try {
        const roleRes = await fetchJS(`/api/role?email=${email}`)    
        const role = await roleRes.json()
        return {status: 200 , role}
    } catch (error) {
        console.log(error);
        return {status: 400 , msg: 'Failed to get role'}
    }
}