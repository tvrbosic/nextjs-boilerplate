import CenteredContent from '@/components/layout/centered-content';
import LoginForm from '@/app/(auth)/sign-in/components/login-form';

export default function LoginPage() {
  return (
    <CenteredContent>
      {/** Content container */}
      <div className="bg-primary flex h-[460px] w-[500px] flex-col items-center justify-center rounded-2xl px-8 py-4">
        <h1 className="text-title mb-2 text-2xl">Login</h1>

        <LoginForm />
      </div>
    </CenteredContent>
  );
}
