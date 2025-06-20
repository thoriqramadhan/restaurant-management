"use client";
import { hideOnPublicRoute } from "@/utils/utils";
import { BookUser, House, PackageSearch } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Role, useRole } from "./context/RoleContext";
import Link from "next/link";

// types
interface NavbarContextType {
  navState: boolean;
  navSetter: () => void;
}
// variables
export const renderBy = {
  admin: [
    { icon: <BookUser />, text: "Manage Users", redirectURL: "/users" },
    {
      icon: <PackageSearch />,
      text: "Manage Products",
      redirectURL: "/products",
    },
  ],
  cashier: [],
  chef: [],
  customer: [],
};
// context
const NavbarContext = React.createContext<NavbarContextType | undefined>(
  undefined
);

export function useNavbar(): NavbarContextType {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [navState, setNavbar] = useState(false);
  function navSetter() {
    setNavbar((prev) => !prev);
  }
  return (
    <NavbarContext.Provider value={{ navState, navSetter }}>
      {children}
    </NavbarContext.Provider>
  );
}

// components
export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  // console.log(session);
  
  const { navState } = useNavbar();
  const roleContext = useRole();
  const role = roleContext?.role as Role;

  const newRenderBy = [{ icon: <House />, text: "Home", redirectURL: "/home" }, ...renderBy[role]]
  const shouldHide = hideOnPublicRoute(pathname);
  if (shouldHide) return null;
  return (
    <div className={`w-[80px] h-screen relative ${!navState && "hidden"}`}>
      <div
        className={`w-[80px] h-screen fixed bg-white text-black p-2 flex flex-col items-center`}
      >
        <div className="flex-1 space-y-3">
          {newRenderBy.map((item, index) => (
            <Link href={item.redirectURL} key={index} className={`p-3 rounded-full block ${pathname.startsWith(item.redirectURL) && 'bg-zinc-400/30'}`}>
              {React.cloneElement(item.icon)}
            </Link>
          ))}
        </div>
        <NavProfile pfp={session?.user?.image} />
      </div>
    </div>
  );
}

function NavProfile({ pfp }: { pfp?: string | null }) {
  const [showOption, setShowOption] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowOption(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative ">
      <div
        className="w-[50px] h-[50px] bg-black rounded-full cursor-pointer relative overflow-hidden"
        onClick={() => setShowOption((prev) => !prev)}
      >
        {pfp && <Image src={pfp ?? ""} layout="fill" alt="profile_image" />}
      </div>
      {/* content */}
      <div
        className={`w-[150px] overflow-hidden bg-white rounded-md border absolute left-[120%] bottom-0 text-center ${
          showOption ? "h-fit" : "h-0 hidden"
        }`}
        ref={ref}
      >
        <span className="block w-full py-1 px-3 cursor-pointer transition-300 hover:bg-black/10">
          Profile
        </span>
        <span
          className="block w-full py-1 px-3 cursor-pointer transition-300 hover:bg-black/10"
          onClick={() => signOut()}
        >
          Sign out
        </span>
      </div>
    </div>
  );
}
