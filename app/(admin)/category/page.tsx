import CategoryPageComponents from '@/components/client/CategoryPageComponents'
import { getAllCategoryWithProductDB } from '@/utils/neon'
import React from 'react'

export default async function Category() {
  const categories = await getAllCategoryWithProductDB()
  return (
    <section className='w-full h-fit space-y-3'>
        <span className=''>
        <h1 className="text-xl font-normal tracking-wide">All Category</h1>
        <p className='font-thin'>Manage yours product categories.</p>
        </span>
        <CategoryPageComponents categories={categories}/>
    </section>
  )
}
