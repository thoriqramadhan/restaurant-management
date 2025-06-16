import { Products } from '@/components/client/ProductPageComponent'
import { getAllCategoryDB, getAllExistingProductImgsDB, getAllProductDB } from '@/utils/neon'
import React from 'react'

export default async function Page() {
  const [products , categories , existingPhotos] = await Promise.all([
    await getAllProductDB(),
    await getAllCategoryDB(),
    await getAllExistingProductImgsDB()
  ])
  return (
    <Products initialProducts={products} initialCategories={categories} existingPhotos={existingPhotos}/>
  )
}
