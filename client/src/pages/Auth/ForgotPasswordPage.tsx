import AuthPage from "@/pages/Auth/AuthPage";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export function ForgotPasswordPage() {
  return (
    <AuthPage
      title="Forgot password"
      description="Enter your email and we'll send reset instructions"
    >
      <ForgotPasswordForm />
    </AuthPage>
  );
}
