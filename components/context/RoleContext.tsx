'use client'

import { getRole } from "@/utils/api/db"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import React, { createContext, useContext, useState } from "react"

const RoleContext = createContext<{role:string} | undefined>(undefined)

export function RoleProvider({children} : {children: React.ReactNode}){
    const [role, setRole] = useState<string>('')
    const {data:session} = useSession()
    const email = session?.user?.email
    console.log(email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const roleQuery = useQuery({queryKey: [email] , queryFn: async () => {
        if(!email) return
        const roleRes = await getRole(email)
        if(!roleRes) return
        setRole(roleRes!.role!.role)
        return roleRes
    } , enabled: !!email , staleTime: 1000 * 60 * 5})
    
    return <RoleContext.Provider value={{role}}>
        {children}
    </RoleContext.Provider>
}

export const useRole = () => {
    const roleContext = useContext(RoleContext)
    return roleContext
}