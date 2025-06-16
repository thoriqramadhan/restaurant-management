// 'use server'
import  CredentialsProvider  from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { JWT, Session } from 'next-auth'
import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from '@neondatabase/serverless'
import { User as UserNext } from 'next-auth'
import { sql } from './utils/neon'
import { User } from './types/database'
import { checkPasswordCorrect } from './utils/validate'
import { getRole } from './utils/api/db';
export const {handlers , auth , signOut , signIn} = NextAuth(() => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  return {
    adapter: PostgresAdapter(pool),
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'email', type: 'email' },
          password: { label: "pasword", type: "password" }
        },
        async authorize(credentials) {
          const dbResult = await sql.query('SELECT * FROM users WHERE email = $1', [credentials?.email]) as User[];
          if (dbResult.length === 0) {
            return null;
          }
          console.log(credentials);


          const isPasswordCorrect = await checkPasswordCorrect(dbResult[0].password, credentials.password as string);
          if (!isPasswordCorrect) throw new Error('Credentials is incorrect!');

          return {
            email: dbResult[0].email ?? '',
            name: dbResult[0].name ?? '',
          };
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      })
    ],
    session: {
      strategy: "jwt", // <--- pastikan ini ada
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
      async jwt({ token, user }: { token: JWT; user?: UserNext; }) {
        if (user?.email) {
          const { role: roleRes } = await getRole(user.email);
          token.id = user.id as string; // biasanya id pasti string di DB
          token.email = user.email ?? '';
          token.name = user.name ?? '';
          token.picture = user.image ?? '';
          token.role = roleRes?.role ?? '';
        }
        return token;
      },
      async session({ session, token }: { session: Session; token: JWT; }) {
        if (token) {
          session.user = {
            id: token.id as string, // pakai assertion karena yakin ada
            email: token.email ?? '',
            name: token.name ?? '',
            image: token.picture ?? '',
            role: token.role ?? ''
          };
        }
        return session;
      },
    }
  };
})
