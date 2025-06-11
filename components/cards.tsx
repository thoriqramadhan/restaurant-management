import { BookUser } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}
export function AuthCard({ children, icon }: AuthCardProps) {
  return (
    <div className="w-[90%] h-[90%] bg-white rounded-3xl p-3 border md:w-1/2 lg:w-1/3 flex flex-col">
      {icon && React.isValidElement(icon) && (
        <div className="mx-auto relative h-[100px] w-[100px] rounded-full overflow-hidden my-5">
          {React.cloneElement(icon as React.ReactElement<HTMLElement>, {
            className: "w-full h-full",
          })}
        </div>
      )}
      {children}
    </div>
  );
}

export function HomeCard({ role }: { role: 'admin' | 'cashier' | 'chef' | 'customer' }) {
  const renderBy = {
    'admin' : [
      {icon:<BookUser/> , text: 'Manage User' , redirectURL: '/home'}
    ],
    'cashier': [],
    'chef': [],
    'customer': []
  }
  // console.log(renderBy[role]);
  console.log(role);
  
  return (
    <div className="w-full flex gap-5 flex-col md:flex-row md:flex-wrap">
      {renderBy[role].map((item , index) => (
        <HomeCardItem key={index} {...item}/>
      ))}
    </div>
  );
}
export function HomeCardItem({
  icon,
  text,
  redirectURL,
}: {
  icon?: React.ReactNode;
  text: string;
  redirectURL: string;
}) {
  return (
    <Link href={redirectURL}>
      <div className="shrink-0 w-full h-[100px] bg-white cursor-pointer rounded-md text-black flex items-center pl-5 gap-x-5 md:w-[250px] md:h-[250px] md:flex-col md:justify-center">
        {icon &&
          React.cloneElement(icon as React.ReactHTMLElement<HTMLElement>, {
            color: "black",
            className: "w-[50px] h-[50px] md:w-[100px] md:h-[100px]",
          })}
        <p className="font-semibold text-lg md:text-3xl mt-3">{text}</p>
      </div>
    </Link>
  );
}
