import LoginForm from '@/app/(auth)/sign-in/components/login-form';

export default function LoginPage() {
  return (
    <div className="relative">
      {/** Background */}
      <div className="bg-darkStone h-dvh w-full" />
      {/** Floating container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/** Content container */}
        <div className="bg-deepRuby flex h-[450px] w-[500px] flex-col items-center justify-center rounded-2xl px-8 py-4">
          <h1 className="mb-2 text-2xl text-stone-100 underline underline-offset-4">
            Login
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
