import AuthPage from "@/pages/Auth/AuthPage";
import { RegisterForm } from "@/components/auth/RegisterForm";

export function RegisterPage() {
  return (
    <AuthPage
      title="Create an account"
      description="Get started with KitsuneCash today"
    >
      <RegisterForm />
    </AuthPage>
  );
}
