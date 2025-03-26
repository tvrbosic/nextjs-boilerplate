import CenteredContent from '@/components/layout/centered-content';
import ForgotPasswordForm from '@/app/(auth)/forgot-password/components/forgot-password-form';

export default function LoginPage() {
  return (
    <CenteredContent>
      {/** Content container */}
      <div className="bg-primary flex h-[400px] w-[500px] flex-col items-center justify-center rounded-2xl px-8 py-4">
        <h1 className="text-title mb-4 text-2xl">Forgot password</h1>

        <div className="text-primary mb-4 text-center text-sm">
          Enter your email address below, and we’ll send you a link to reset
          your password. Check your inbox and follow the instructions to create
          a new password.
        </div>

        <ForgotPasswordForm />
      </div>
    </CenteredContent>
  );
}
