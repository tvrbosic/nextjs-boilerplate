'use client';
// COMPONENTS
import Button from '@/components/button/button';
import Input from '@/components/input/input';

export default function LoginForm() {
  const loginAction = (formData: FormData) => {};

  return (
    <form
      action={loginAction}
      className="w-full flex flex-col space-y-4 justify-center"
    >
      <Input inputType="email" inputLabel="E-mail" />
      <Input inputType="password" inputLabel="Password" />
      <div className="mt-2">
        <Button fill size="lg">
          Sign in
        </Button>
      </div>
    </form>
  );
}
