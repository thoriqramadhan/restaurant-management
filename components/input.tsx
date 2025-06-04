import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {className?: string}

export default function Input({className , ...props}: InputProps) {
  return (
    <input {...props} className={'w-full h-fit border block rounded-lg px-3 py-2 my-2' + ' ' + className}/>
  );
}
