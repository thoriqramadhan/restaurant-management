import { cn } from "@/utils/cn";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {className?: string , inputName: string , labelVal?:string}

export default function Input({className ,  inputName , labelVal ,...props}: InputProps) {
  return (
    <>
      <label htmlFor={inputName} className="capitalize">{labelVal? labelVal:inputName}</label>
      <input {...props} name={inputName} id={inputName} className={cn('w-full h-fit border block rounded-lg px-3 py-2 my-2 read-only:cursor-not-allowed read-only:bg-slate-300/50 read-only:text-slate-500 read-only:focus:ring-0 read-only:focus:outline-0 read-only:select-none' , className)}/>
    </>
  );
}
