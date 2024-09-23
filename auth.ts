import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
// import prisma from "@/lib/db"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.role = user.role; // agrega informacion adicional al token
      }
      return token
    },
    session({ session, token }) {
      session.user.role= token.role as string; // expone la informacion de el token en la sesion
      return session
    },
  },
})

