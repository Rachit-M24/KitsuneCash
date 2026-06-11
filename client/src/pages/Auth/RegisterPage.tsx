import { AuthCard } from "@/components/auth/AuthCard";
import { RegisterForm } from "@/components/auth/RegisterForm";

export function RegisterPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Get started with KitsuneCash today"
    >
      <RegisterForm />
    </AuthCard>
  );
}
