'use client'
import { AlignEndVertical } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { useNavbar } from "./Navbar";
import { cn } from "@/utils/cn";

export function NavToggle() {
    const {navSetter} = useNavbar()
  return (
    <div className="w-[30px] h-[30px] bg-white rounded-lg flex items-center justify-center cursor-pointer border select-none" onClick={() => navSetter()}>
      <AlignEndVertical size={20} color="black" />
    </div>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  children:React.ReactNode,
  className?: string,
}
export function Button({children, className , ...props}: ButtonProps) {
  return <button className={cn('px-3 py-1 text-white bg-black rounded-md capitalize border' , className)} {...props}>{children}</button>
}