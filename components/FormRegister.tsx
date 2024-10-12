"use client";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LockKeyhole, Mail, Smile, Eye, EyeOff } from "lucide-react";
import { useRegisterForm } from "@/Hook/useRegisterForm";
import { ModeToggle } from "./toggle-dark-mode";

const FormRegister = () => {
  const {
    form,
    onSubmit,
    isPending,
    error,
    showPassword,
    ShowConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    routerLogin,
  } = useRegisterForm();

  return (
    <div className="flex items-center justify-center w-full pt-0 md:pt-20">
      <Card className="w-full sm:w-72 md:w-96 rounded-md border-collapse">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex justify-center pb-6 gap-4">
            Create your account <ModeToggle />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Smile className=" pr-2" /> name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="write your name" {...field} />
                    </FormControl>
                    <FormDescription className="absolute ">
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />

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
                    <FormLabel className="flex items-center justify-between">
                      <div className="flex items-center">
                        <LockKeyhole className="pr-2" />
                        Password
                      </div>
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="flex items-center -mb-[4.8rem] mr-2"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="your password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      <div className="flex items-center">
                        <LockKeyhole className="pr-2" />
                        Password
                      </div>
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="flex items-center -mb-[4.8rem] mr-2"
                      >
                        {ShowConfirmPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={ShowConfirmPassword ? "text" : "password"}
                        placeholder="confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />

              {error && <FormMessage>{error}</FormMessage>}

              <div className="pt-0 md:pt-4 flex justify-center">
                <Button type="submit" disabled={isPending}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardDescription className="flex justify-center text-l">If you don't have an account, you can create one here.</CardDescription>
        <CardFooter className=" flex justify-center pt-2 md:pt-4">
          <Button onClick={() => routerLogin()}>
            {" "}
            Login{" "}
          </Button>
        </CardFooter>
      </Card>
    </div>

  );
};

export default FormRegister;
