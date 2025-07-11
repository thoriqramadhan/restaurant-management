'use client'
import { cn } from '@/utils/cn'
import React, { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    name:string
    className?:string
    children: React.ReactNode
}
export function SelectComponent({name, children ,className, ...props}: SelectProps) {
  return (
    <>
    <label htmlFor={name} className='capitalize'>{name}</label>
    <select name={name} id={name} {...props} className={cn('block w-full p-3 rounded-md border' , className)}>
    {children}
    </select>
    </>
  )
}
