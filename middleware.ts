// middleware.ts
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(req: NextRequest) {
  const session = await auth();
  const cookieStore = await cookies()
  if(typeof session == null){
    cookieStore.delete('authjs.session-token')
  }
  // console.log(session , cookieStore);
  // routes
  const publicRoute = ['/signin', '/signup' , '/verify']
  const adminRoute = ['/users' , '/products']
  // path possition
  const isInDefaultRoute = req.nextUrl.pathname.length == 1
  const isInPublicRoute = publicRoute.some(route => req.nextUrl.pathname.startsWith(route))
  const isInAdminRoute = adminRoute.some(route => req.nextUrl.pathname.startsWith(route))
  // const userRole = cookieStore.get('')
  // ✅ Jika belum login, redirect ke halaman signin
  if (!session?.user && !isInPublicRoute) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  if(isInDefaultRoute && session?.user){
    return NextResponse.redirect(new URL("/home", req.url));
  }
  if(isInAdminRoute && session?.user){
    
  }
  if(isInPublicRoute && session?.user){
    return NextResponse.redirect(new URL("/home", req.url));
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
