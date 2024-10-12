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
import { Input } from "@/components/ui/input";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "@/Hook/useLoginForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ModeToggle } from "@/components/ToggleDarkMode";
import { ProgressDemo } from "@/components/Progress";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FormLogin = ({ isVerified }: { isVerified: boolean }) => {
  const {
    form,
    onSubmit,
    isPending,
    error,
    showPassword,
    togglePasswordVisibility,
    routerRegister,
  } = useLoginForm();

  return (
    <div className="flex items-center justify-center w-full pt-20 ">
      <Card className="w-96 rounded-md border-collapse ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex justify-center pb-6 gap-4">
            Login to your account <ModeToggle />
          </CardTitle>
          {isVerified && (
            <p className="absolute text-center text-green-500 text-sm transform -translate-y-4 ">
              Email verifield, you can now login to your account
            </p>
          )}
        </CardHeader>
        <CardContent>
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
                    <FormDescription className="absolute ">
                      <FormMessage />
                    </FormDescription>
                  </FormItem>
                )}
              />
              {error && <FormMessage>{error}</FormMessage>}

              <div className="pt-4 flex justify-center">
                <Button className="w-full" type="submit" disabled={isPending}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardDescription className="flex justify-center text-l">
          If you are not registered, you can register here!
        </CardDescription>
        <CardFooter className=" flex justify-center pt-4">
          <Button className="w-full" onClick={() => routerRegister()}>
            {" "}
            Register{" "}
          </Button>
          {/* <ProgressDemo/> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormLogin;
