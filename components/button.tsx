'use client'
import { AlignEndVertical } from "lucide-react";
import React from "react";
import { useNavbar } from "./Navbar";

export function NavToggle() {
    const {navSetter} = useNavbar()
  return (
    <div className="w-[30px] h-[30px] bg-white rounded-lg flex items-center justify-center cursor-pointer border select-none" onClick={() => navSetter()}>
      <AlignEndVertical size={20} color="black" />
    </div>
  );
}
