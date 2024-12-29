"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import { useRegister } from "@/hooks/use-authentication";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GuestLoginButton } from "./guest-login-button";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
}: RegisterModalProps) {
  const { mutate: register, isPending } = useRegister({
    onSuccess() {
      form.reset();
      onClose();
    },
  });

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    register(data);
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Enter your details below to create your account
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </Form>

        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => {
                onClose();
                onLoginClick();
              }}
            >
              Login here
            </Button>
          </p>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>


        <GuestLoginButton onSuccess={onClose} />
        
      </DialogContent>
    </Dialog>
  );
}
