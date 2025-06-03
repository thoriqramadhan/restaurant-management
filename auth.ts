import NextAuth from 'next-auth'
import { PgPool } from './app/utils/pg'
import PostgresAdapter from '@auth/pg-adapter'
export const {handlers , auth , signOut , signIn} = NextAuth({
    adapter: PostgresAdapter(PgPool),
    providers: []
})
