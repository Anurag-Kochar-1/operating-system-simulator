"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import { useLogin } from "@/hooks/use-authentication";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => login(data));

  return (
    <div className="container mx-auto mt-20 max-w-md">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Do not have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
