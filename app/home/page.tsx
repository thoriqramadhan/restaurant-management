'use client'
import { HomeCard } from '@/components/cards'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function Home() {
  const { data: session } = useSession()
  return (
    <>
    <div className='text-2xl font-bold tracking-wider'>Hello,{session?.user?.name}!</div>
    <span className='mb-5 block'>Admin</span>
    <hr />
    <p className='my-3 text-lg font-normal'>Available feature for you</p>
    <HomeCard/>
    </>
  )
}
