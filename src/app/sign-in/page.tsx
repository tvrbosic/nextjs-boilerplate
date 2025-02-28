import LoginForm from '@/app/sign-in/components/login-form';

export default function LoginPage() {
  return (
    <div className="relative">
      {/** Background */}
      <div className="w-full h-dvh bg-darkStone" />
      {/** Floating container */}
      <div className="absolute inset-0 flex justify-center items-center">
        {/** Content container */}
        <div className="flex bg-deepRuby rounded-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
