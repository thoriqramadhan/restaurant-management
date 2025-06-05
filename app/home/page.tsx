'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Page() {
  const { data: session } = useSession()
  return (
    <div>Hello,{session?.user?.name}</div>
  )
}
