import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/validators/login.zod";
import { loginAction } from "@/actions/loginAction";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export const useLoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const routerRegister = () => {
    router.push("/register");
  }

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError(null);

    startTransition(async () => {
      const response = await loginAction(values);
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
    error,
    showPassword,
    setShowPassword,
    togglePasswordVisibility,
    routerRegister,
  };
};
