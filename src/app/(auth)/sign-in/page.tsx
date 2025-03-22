import CenteredContent from '@/components/layout/centered-content';
import LoginForm from '@/app/(auth)/sign-in/components/login-form';

export default function LoginPage() {
  return (
    <CenteredContent>
      {/** Content container */}
      <div className="bg-deepRuby flex h-[450px] w-[500px] flex-col items-center justify-center rounded-2xl px-8 py-4">
        <h1 className="mb-2 text-2xl text-stone-100 underline underline-offset-4">
          Login
        </h1>

        <LoginForm />
      </div>
    </CenteredContent>
  );
}
