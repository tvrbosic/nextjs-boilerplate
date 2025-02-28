import LoginForm from '@/app/sign-in/components/login-form';

export default function LoginPage() {
  return (
    <div className="relative">
      {/** Background */}
      <div className="w-full h-dvh bg-darkStone" />
      {/** Floating container */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/** Content container */}
        <div className="w-[500px] h-[400px] px-8 py-4 flex flex-col items-center justify-center bg-deepRuby rounded-2xl">
          <h1 className="text-stone-200 text-2xl mb-2">Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
