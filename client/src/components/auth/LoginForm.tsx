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
  const { actions } = useAuth();
  const [rootError, setRootError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <div className="flex flex-col gap-2 text-center text-sm text-muted-foreground">
          <Link
            to={AUTH_ROUTES.forgotPassword}
            className="text-primary underline-offset-4 hover:underline"
          >
            Forgot your password?
          </Link>
          <p>
            Don&apos;t have an account?{" "}
            <Link
              to={AUTH_ROUTES.register}
              className="text-primary underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
