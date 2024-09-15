
import Credentials from "@auth/core/providers/credentials"
import type { NextAuthConfig } from "next-auth"
 
// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({

          authorize: async (credentials) => {

            console.log(credentials)

            return {
                id: "1",
                name: "Angel",
                email: "angel@angel.com",
              
            }

          },
        }),
      ],
} satisfies NextAuthConfig