import { AuthCard } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Forgot password"
      description="Enter your email and we'll send reset instructions"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
