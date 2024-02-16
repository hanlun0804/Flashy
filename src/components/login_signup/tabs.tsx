"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signup } from "@/actions/signup-actions";
import { login } from "@/actions/login-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormError from "../form-error";

export const LoginQuestions = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
});

export function Tabobject() {
  const router = useRouter();

  const [loginError, setLoginError] = useState("");

  const [signupError, setSignupError] = useState("");

  const form = useForm<z.infer<typeof LoginQuestions>>({
    resolver: zodResolver(LoginQuestions),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: z.infer<typeof LoginQuestions>) => {
    setLoginError("");
    try {
      await login(data);
      router.push("profile");
    } catch (e: any) {
      setLoginError(e.message);
    }
  };

  const onSignup = async (data: z.infer<typeof LoginQuestions>) => {
    setSignupError("");
    try {
      await signup(data);
      router.push("profile");
    } catch (e: any) {
      setSignupError(e.message);
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Sign in</TabsTrigger>
        <TabsTrigger value="Signup">Create account</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Sign in to Flashy</CardTitle>
            <CardDescription>
              Sign in to Flashy with your existing account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onLogin)}
                className="flex flex-col space-y-4"
              >
                <FormField
                  name={"email"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input {...field} placeholder={"johndoe@gmail.com"} />
                    </FormItem>
                  )}
                />

                <FormField
                  name={"password"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        type="password"
                        {...field}
                        placeholder={"********"}
                      />
                    </FormItem>
                  )}
                />
                <FormError message={loginError}></FormError>

                <Button type="submit">Sign in</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Signup">
        <Card>
          <CardHeader>
            <CardTitle>Create account</CardTitle>
            <CardDescription>
              Create a new account using your email to start using Flashy!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSignup)}
                className="flex flex-col space-y-4"
              >
                <FormField
                  name={"email"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input {...field} placeholder={"johndoe@gmail.com"} />
                    </FormItem>
                  )}
                />

                <FormField
                  name={"password"}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">
                        Password (min. 8 characters)
                      </FormLabel>
                      <Input
                        type="password"
                        {...field}
                        placeholder={"********"}
                      />
                    </FormItem>
                  )}
                />

                <FormError message={signupError}></FormError>

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
