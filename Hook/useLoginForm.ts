import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/validators/login.zod";
import { loginAction } from "@/actions/loginAction";
import { signIn } from "next-auth/react"


export const useLoginForm = () => {

  const form = useForm<z.infer<typeof loginSchema >>({
    resolver: zodResolver(loginSchema ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema >) => {
    //  await loginAction(values);
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })
  
    
  };

  return {
    form,
    onSubmit,
  };
};



