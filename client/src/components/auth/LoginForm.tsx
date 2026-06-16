import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

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
import { AUTH_ROUTES } from "@/constants/auth.routes";
import { useAuth } from "@/hooks/use-auth";
import { getErrorMessage } from "@/lib/get-error-message";
import { loginSchema, type LoginFormValues } from "@/schemas/auth/login.schema";

export function LoginForm() {
  const navigate = useNavigate();
  const { actions, isAuthenticated , isInitializing } = useAuth();
  const [rootError, setRootError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if (isInitializing) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    navigate("/");
  }
  
  const onSubmit = async (values: LoginFormValues) => {
    try {
      setRootError(null);
      await actions.logIn(values);
      navigate("/");
    } catch (error) {
      setRootError(getErrorMessage(error));
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 bg-zinc-50/50 border-zinc-200 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-colors"
                  {...field}
                />
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
                <Input
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-11 bg-zinc-50/50 border-zinc-200 focus-visible:ring-orange-500 focus-visible:border-orange-500 transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {rootError ? (
          <p className="text-sm text-destructive" role="alert">
            {rootError}
          </p>
        ) : null}

        <Button type="submit" className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-sm hover:shadow transition-all" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="flex flex-col gap-3 pt-2 text-center text-sm font-medium text-zinc-500">
          <Link
            to={AUTH_ROUTES.forgotPassword}
            className="text-orange-600 hover:text-orange-700 underline-offset-4 hover:underline transition-colors"
          >
            Forgot your password?
          </Link>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              to={AUTH_ROUTES.register}
              className="text-orange-600 hover:text-orange-700 font-semibold underline-offset-4 hover:underline transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
