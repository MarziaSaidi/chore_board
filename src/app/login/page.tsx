import { AuthSplitLayout } from "@/components/login/AuthSplitLayout";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthSplitLayout
      title="Welcome back"
      subtitle="Sign in to your Chore Board"
    >
      <LoginForm urlError={error} />
    </AuthSplitLayout>
  );
}
