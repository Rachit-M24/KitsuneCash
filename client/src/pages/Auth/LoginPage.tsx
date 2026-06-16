import AuthPage from "@/pages/Auth/AuthPage";
import { LoginForm } from "@/components/auth/LoginForm";

export function LoginPage() {
  return (
    <AuthPage
      title="Welcome back"
      description="Sign in to your KitsuneCash account"
    >
      <LoginForm />
    </AuthPage>
  );
}
