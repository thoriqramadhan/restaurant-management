import { sql } from '@/utils/neon'
import Link from 'next/link'
import React from 'react'

export default async function Home() {
  const res = await sql.query('SELECT * FROM users')
  console.log(res);
  
  return (
    <div className="w-full h-screen">
      <header className='w-full h-[50px] bg-white flex justify-end'>
        <div className="w-fit flex gap-x-5 px-10 text-black h-full items-center">
          <Link href={'/signup'}>SignUp</Link>
          <Link href={'/signin'}>SignIn</Link>
        </div>
      </header>
    </div>
  )
}
