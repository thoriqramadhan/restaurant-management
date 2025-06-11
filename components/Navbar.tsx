"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";

interface NavbarContextType {
  navState: boolean;
  navSetter: () => void;
}
const NavbarContext = React.createContext<NavbarContextType | undefined>(
  undefined
);

export function useNavbar(): NavbarContextType | undefined {
  const context = useContext(NavbarContext);
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
export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { navState } = useNavbar();
  const hideOnRoutes = ["/signin", "/signup", "/auth"];
  const shouldHide = hideOnRoutes.some((route) => pathname.startsWith(route));
  if (shouldHide) return null;
  return (
    <div className={`w-[80px] h-screen relative ${!navState && "hidden"}`}>
      <div
        className={`w-[80px] h-screen fixed bg-white text-black p-2 flex flex-col items-center`}
      >
        <div className="flex-1"></div>
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
