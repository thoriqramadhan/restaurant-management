import NextAuth from 'next-auth'
import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from '@neondatabase/serverless'
export const {handlers , auth , signOut , signIn} = NextAuth(() => {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    return {
      adapter: PostgresAdapter(pool),
      providers: [],
    }
  })
