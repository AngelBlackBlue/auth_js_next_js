import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useLogin from "@/Hook/useLogin";
import { loginSchema } from "@/validators/login.zod";



export const useLoginForm = () => {
//  const { handleSingin } = useLogin();

  const form = useForm<z.infer<typeof loginSchema >>({
    resolver: zodResolver(loginSchema ),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema >) => {
    console.log(values);
    // handleSingin(values);
    
  };

  return {
    form,
    onSubmit,
  };
};
