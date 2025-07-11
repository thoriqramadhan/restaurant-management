import { auth } from '@/auth'
import UsersPageComponents from '@/components/client/UsersPageComponents'
import { getAllUsers } from '@/utils/neon';
import React from 'react'

export default async function UsersPage() {
  const session = await auth()
  const users = await getAllUsers(session?.user?.email || '')
  console.log(users);
  return (
    <section className='w-full h-screen'>
      <h2 className='text-title'>Users</h2>
      <p className='text-subtitle'>Manage your users and users role.</p>
      <UsersPageComponents users={users}/>
    </section>
  )
}
