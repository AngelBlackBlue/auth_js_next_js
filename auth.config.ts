
import Credentials from "@auth/core/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "@/validators/login.zod"
import { prisma } from "@/prisma"
import bcrypt from "bcryptjs"
 
// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({

          authorize: async (credentials) => {

            const { data, success } = loginSchema.safeParse(credentials)


            if (!success) {
              throw new Error("Invalid credentials")
            }


            const user = await prisma.user.findUnique({
              where: {
                email: data.email,
              },
            })
            
            if (!user || !user.password) {
              throw new Error("Invalid credentials")
            }

            const isValid = await bcrypt.compare(data.password, user.password) 
            
            if (!isValid) {
              throw new Error("Invalid credentials")
            }
                    

           return user
            

          },
          
        }),
      ],
} satisfies NextAuthConfig