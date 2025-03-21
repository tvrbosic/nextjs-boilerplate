import ResetPasswordForm from '@/app/(auth)/reset-password/[token]/components/reset-password-form';

export default function LoginPage() {
  return (
    <div className="relative">
      {/** Background */}
      <div className="bg-darkStone h-dvh w-full" />
      {/** Floating container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/** Content container */}
        <div className="bg-deepRuby flex h-[450px] w-[500px] flex-col items-center justify-center rounded-2xl px-8 py-4">
          <h1 className="mb-4 text-2xl text-stone-100 underline underline-offset-4">
            Reset password
          </h1>

          <div className="mb-4 text-center text-sm text-teal-100">
            Enter a new password below to change your current password.
          </div>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
