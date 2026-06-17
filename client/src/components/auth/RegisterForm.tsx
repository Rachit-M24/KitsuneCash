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
import {
  registerSchema,
  type RegisterFormValues,
} from "@/schemas/auth/register.schema";

export function RegisterForm() {
  const navigate = useNavigate();
  const { actions } = useAuth();
  const [rootError, setRootError] = useState<string | null>(null);
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setRootError(null);
      await actions.register(values);
      navigate("/");
    } catch (error) {
      setRootError(getErrorMessage(error));
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="User Name"
                  autoComplete="username"
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
                  placeholder="Create a password"
                  autoComplete="new-password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
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
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <p className="text-center pt-2 text-sm font-medium text-zinc-500">
          Already have an account?{" "}
          <Link
            to={AUTH_ROUTES.login}
            className="text-orange-600 hover:text-orange-700 font-semibold underline-offset-4 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
}
