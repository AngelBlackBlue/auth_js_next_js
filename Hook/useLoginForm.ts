import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/validators/login.zod";
import { signIn } from "next-auth/react" // del lado del client
import { AuthError } from "next-auth";

export const useLoginForm = () => {

  const form = useForm<z.infer<typeof loginSchema >>({
    resolver: zodResolver(loginSchema ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginAction = async (values: z.infer<typeof loginSchema >) => {

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

  const onSubmit = async (values: z.infer<typeof loginSchema >) => {

    const response = await loginAction(values);
    console.log(response);
    
      
  };

  return {
    form,
    onSubmit,
  };
};



