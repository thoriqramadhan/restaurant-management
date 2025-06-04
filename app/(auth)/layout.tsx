import React from 'react'

export default function AuthLayout({children}: {children: React.ReactNode})  {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
        {children}
    </div>
  )
}
