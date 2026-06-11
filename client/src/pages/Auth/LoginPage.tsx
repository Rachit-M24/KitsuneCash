import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your KitsuneCash account"
    >
      <LoginForm />
    </AuthCard>
  );
}
