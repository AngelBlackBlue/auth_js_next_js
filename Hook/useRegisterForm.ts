import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema  } from "@/validators/register.zod";
import { registerAction } from "@/actions/registerAction";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";


export const useRegisterForm = () => {

  const [isPending, startTransition] = useTransition()
  const [ error, setError ] = useState<string | null>(null)
  const router = useRouter()
  

  const form = useForm<z.infer<typeof registerSchema >>({
    resolver: zodResolver(registerSchema ),
    defaultValues: {
      name:"",
      email: "",
      password: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof registerSchema >) => {

    setError(null);

    startTransition( async() => {
      
      const response = await registerAction(values);
      
      if (response.error) {
        
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


