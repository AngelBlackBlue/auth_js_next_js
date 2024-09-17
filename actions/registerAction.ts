"use server"

import { registerSchema } from "@/validators/register.zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";;
import { z } from "zod";
import { prisma } from "@/prisma";
import bcrypt from 'bcryptjs';

export const registerAction = async (values: z.infer<typeof registerSchema >) => {

    try {
        const { data, success } = registerSchema.safeParse(values)

        if (!success){
            return {
                error: "Invalid data"
            }
        }

        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        })


        if (user) {
            return {
                error: "User already exists"
            }
        }

        const passwordHash = await bcrypt.hash(data.password, 10)

        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHash,
            }
        })

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      return { success: true };
      
    } catch (error) {
      
      if (error instanceof AuthError) {
        return { error: error.cause?.err?.message };   
      }
      return { error: "error 500" };
      
    }

  }