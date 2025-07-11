import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default function LoadingPage() {
  return (
    <div className='bg-black flex text-white justify-center items-center'><LoaderCircle className='animate-spin'/></div>
  )
}
