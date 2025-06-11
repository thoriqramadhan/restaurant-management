'use client'
import React from "react";
import { NavToggle } from "../button";
import { usePathname } from "next/navigation";
import { hideOnPublicRoute } from "@/utils/utils";

export default function HeaderLayout() {
    const pathname = usePathname()
    const shouldHide = hideOnPublicRoute(pathname)
    if(shouldHide) return null
  return (
    <div className="w-full mb-5">
      <NavToggle />
    </div>
  );
}
