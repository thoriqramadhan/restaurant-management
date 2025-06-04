import React from 'react'

interface AuthCardProps {
    children: React.ReactNode,
    icon?: React.ReactNode,
}
export function AuthCard({children , icon} : AuthCardProps) {
  return (
    <div className="w-[90%] h-[90%] bg-white rounded-3xl p-3 border md:w-1/2 lg:w-1/3 flex flex-col">
        {
            icon && React.isValidElement(icon) && (
            <div className="mx-auto relative h-[100px] w-[100px] rounded-full overflow-hidden my-5">
                {React.cloneElement(icon as React.ReactElement<HTMLElement>, { className: "w-full h-full" })}
            </div>
            )
        }
        {children}
    </div>
  )
}
