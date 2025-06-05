// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();
  console.log(session);
  
  const publicRoute = ['/signin', '/signup' , '/verify']
  const isInPublicRoute = publicRoute.includes(req.nextUrl.pathname)

  if(isInPublicRoute && session?.user){
    return NextResponse.redirect(new URL("/home", req.url));
  }
  // ✅ Jika belum login, redirect ke halaman signin
  if (!session?.user && !isInPublicRoute) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

// 🌐 Hanya jalankan middleware di halaman HTML, exclude:
// - file statis (seperti .png, .jpg, .svg, .css, .js)
// - public paths (/signin, /signup, /_next, dll)

export const config = {
  matcher: [
    /*
     * Match semua path kecuali:
     * - /_next (Next.js assets)
     * - /favicon.ico
     * - /signin, /signup
     * - semua file statis (dengan ekstensi)
     */
    "/((?!_next|favicon.ico|api|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js)).*)",
  ],
};
