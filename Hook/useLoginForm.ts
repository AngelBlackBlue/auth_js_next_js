import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/validators/login.zod";
//import { signIn } from "next-auth/react" // del lado del client
 import { loginAction } from "@/actions/loginAction";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AuthError } from "next-auth";



export const useLoginForm = () => {

  const [isPending, startTransition] = useTransition()
  const [ error, setError ] = useState<string | null>(null)
  const router = useRouter()
  

  const form = useForm<z.infer<typeof loginSchema >>({
    resolver: zodResolver(loginSchema ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const loginAction = async (values: z.infer<typeof loginSchema >) => {

  //   try {

  //     await signIn("credentials", {
  //       email: values.email,
  //       password: values.password,
  //       redirect: false,
  //     })
      
  //     return { success: true };
      
  //   } catch (error) {
      
  //     if (error instanceof AuthError) {
  //       return { error: error.cause?.err?.message };   
  //     }
  //     return { error: "error 500" };
      
  //   }

  // }

  const onSubmit = async (values: z.infer<typeof loginSchema >) => {

    setError(null);

    startTransition( async() => {
      const response = await loginAction(values);
      console.log(response, "Hola soy response");
      console.log(response.error, "Hola soy response error");
      
      if (response.error) {
        console.log(response.error, "Hola soy response error de nuevo")
        setError(response.error); 
      } else {
        router.push("/dashboard");
      }

     
    });
    
      
  };

  return {
    form,
    onSubmit,
    isPending,
    error
  };
};



