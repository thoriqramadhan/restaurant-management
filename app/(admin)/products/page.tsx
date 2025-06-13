import { Products } from '@/components/client/ProductPageComponent'
import { supabaseServer } from '@/utils/supabase'
import React from 'react'

export default async function Page() {
  const productRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product`) 
  const products = await productRes.json()
  const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category`) 
  const categories = await categoryRes.json()
  const existingPhotos = await supabaseServer.storage.from('oms').list('products')
  return (
    <Products initialProducts={products} initialCategories={categories}/>
  )
}
