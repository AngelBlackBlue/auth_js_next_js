import Credentials from "@auth/core/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "@/validators/login.zod";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import {nanoid} from "nanoid";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        if (!user.emailVerified) {
          const verificationToken = await prisma.verificationToken.findFirst({
            where: {
              identifier: user.email,
            },
          });

          if (verificationToken?.identifier) {
            await prisma.verificationToken.delete({
              where: {
                identifier: user.email,
              },
            });
          }

          const token = nanoid();
          await prisma.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            },
          })

          throw new Error("Please check your email");
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
