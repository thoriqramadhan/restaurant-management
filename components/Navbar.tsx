"use client";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  const hideOnRoutes = ["/signin", "/signup", "/auth"];
  const shouldHide = hideOnRoutes.some(route => pathname.startsWith(route));

  if (shouldHide) return null;
  return (
    <div className="w-full h-[50px] bg-white text-black px-5 flex justify-end">
      <button
        className="cursor-pointer"
        onClick={() => signOut({ redirectTo: "/signin" })}
      >
        SignOut
      </button>
    </div>
  );
}

