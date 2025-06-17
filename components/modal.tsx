import { cn } from '@/utils/cn'
import React from 'react'
import { useModal } from './context/ModalContext'

interface ModalProps {
    className?:string
    type: string
    value?: Record<string , unknown>
    children: React.ReactNode
}
export default function Modal({className , children , type}: ModalProps) {
    const {modalState , handleModal} = useModal()
  return (
    <div className={cn('w-full h-screen bg-black/30 backdrop-blur-md fixed left-0 top-0 justify-center items-center' , modalState.state && modalState.type === type ? 'flex' : 'hidden')} onClick={() => handleModal(type)}>
        <div className={cn('min-w-[300px] max-w-fit min-h-[300px] max-h-fit bg-white rounded-md' , className)} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}
