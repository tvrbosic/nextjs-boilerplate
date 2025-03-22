import CenteredContent from '@/components/layout/centered-content';
import ForgotPasswordForm from '@/app/(auth)/forgot-password/components/forgot-password-form';

export default function LoginPage() {
  return (
    <CenteredContent>
      {/** Content container */}
      <div className="bg-deepRuby flex h-[400px] w-[500px] flex-col items-center justify-center rounded-2xl px-8 py-4">
        <h1 className="mb-4 text-2xl text-stone-100 underline underline-offset-4">
          Forgot password
        </h1>

        <div className="mb-4 text-center text-sm text-teal-100">
          Enter your email address below, and we’ll send you a link to reset
          your password. Check your inbox and follow the instructions to create
          a new password.
        </div>

        <ForgotPasswordForm />
      </div>
    </CenteredContent>
  );
}
