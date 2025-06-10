'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function AuthLayout({children}: {children: React.ReactNode})  {
  return (
    <QueryClientProvider client={queryClient}> 
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
        {children}
    </div>
     </QueryClientProvider> 
  )
}
