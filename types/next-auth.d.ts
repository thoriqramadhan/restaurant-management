/* eslint-disable @typescript-eslint/no-empty-object-type */
// next-auth.d.ts (buat di `types/` atau `src/` folder)

// Import NextAuth types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"

// Extend built-in interfaces
declare module "next-auth" {
  export interface DefaultSession {
    user?: User
    expires: ISODateString
  }

  /** The active session of the logged in user. */
  export interface Session extends DefaultSession {}

  export interface DefaultUser {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }

  /**
   * The shape of the returned object in the OAuth providers' `profile` callback,
   * available in the `jwt` and `session` callbacks,
   * or the second parameter of the `session` callback, when using a database.
   */
  export interface User extends DefaultUser {}

  export interface JWT {
    id?: string
    name?: string | null
    email?: string | null
    picture?: string | null
    role?: string | null
    [key: string]: unknown // ← TAMBAHKAN INI
  }
}
