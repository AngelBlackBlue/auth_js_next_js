"use client"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import { useLoginForm} from "@/Hook/useLoginForm";
import { useState } from "react";

const FormLogin = () => {

  const { form, onSubmit, isPending, error } = useLoginForm();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center w-full pt-40 ">
      <div className="w-96 rounded-md border px-6 py-8 bg-[#25091d]/90 ">
        <h1 className="text-2xl font-bold flex justify-center pb-6">
          Login to your account 😎
        </h1>

        <div className="pt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Mail className=" pr-2" /> email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="your_email@email.com" {...field} />
                    </FormControl>
                    <FormDescription className="absolute ">
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <LockKeyhole className=" pr-2" /> password
                    </FormLabel>
                    <FormControl>
                      <Input         type={showPassword ? "text" : "password"} 
                           placeholder="your password" {...field}  />
                           

                    </FormControl>
                    {/* <button
        type="button"
        onClick={togglePasswordVisibility}
        className="relative "
      >
        {showPassword ? <EyeOff/> : <Eye/>}
      </button> */}

                    <FormDescription className="absolute ">
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />


              {
                error && <FormMessage>{error}</FormMessage>
              }

              <div className="pt-4 flex justify-center">
                <Button type="submit" className=" bg-[#791b6b]" disabled={isPending}>Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="glowBox -z-10"></div>
    </div>
  );
};

export default FormLogin;
