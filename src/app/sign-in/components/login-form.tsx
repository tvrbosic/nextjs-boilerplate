'use client';
// COMPONENTS
import Button from '@/components/button/button';
import Input from '@/components/input/input';

export default function LoginForm() {
  const loginAction = (formData: FormData) => {};

  return (
    <form
      action={loginAction}
      className="w-[500px] h-[400px] flex flex-col space-y-4 px-8 py-4 justify-center"
    >
      <Input inputType="email" inputLabel="E-mail" />
      <Input inputType="password" inputLabel="Password" />
      <div className="mt-2">
        <Button fill>Sign in</Button>
      </div>
    </form>
  );
}
