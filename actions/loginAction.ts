"use server"

import { loginSchema } from "@/validators/login.zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";;
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof loginSchema >) => {

    try {

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