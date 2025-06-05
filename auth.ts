import  CredentialsProvider  from 'next-auth/providers/credentials'
import NextAuth, { Session, User } from 'next-auth'
import PostgresAdapter from '@auth/pg-adapter'
import { Pool } from '@neondatabase/serverless'
import { sql } from './utils/neon'
import { JWT } from 'next-auth/jwt'
export const {handlers , auth , signOut , signIn} = NextAuth(() => {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    return {
      adapter: PostgresAdapter(pool),
      providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: {label: 'email', type: 'email'},
            password: { label: "pasword", type: "password" }
          },
          async authorize(credentials) {
            const dbResult = await sql.query('SELECT * FROM users WHERE email = $1' , [credentials?.email])
            if(dbResult.length === 0) {
              return null
            }
            return {
              email: dbResult[0].email ?? '',
              name: dbResult[0].name ?? '',
            }
          }
        })
      ],
      session: {
        strategy: "jwt", // <--- pastikan ini ada
      },
      secret: process.env.JWT_SECRET,
      callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
          if (user) {
            token.id = user.id as string;        // biasanya id pasti string di DB
            token.email = user.email ?? '';
            token.name = user.name ?? '';
          }
          return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
          if (token) {
            session.user = {
              id: token.id as string,             // pakai assertion karena yakin ada
              email: token.email ?? '',
              name: token.name ?? '',
            };
          }
          return session;
        },
      }
      
    }
  })
