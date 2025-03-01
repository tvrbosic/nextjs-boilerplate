'use client';
// COMPONENTS
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';

export default function LoginForm() {
  const loginAction = (formData: FormData) => {};

  return (
    <form
      action={loginAction}
      className="w-full flex flex-col space-y-4 justify-center"
    >
      <Input inputType="email" inputLabel="E-mail" />

      <Input inputType="password" inputLabel="Password" />

      <div className="text-end">
        <NavLink href={'/forgot-password'} size="sm">
          Forgot password?
        </NavLink>
      </div>

      <div className="mt-3">
        <Button fill size="lg">
          Sign in
        </Button>
      </div>

      <div className="flex flex- space-x-2 justify-center items-center">
        <p className="text-purple-100">Don't have an account?</p>
        <NavLink href={'/register'} variant="light">
          Register
        </NavLink>
      </div>
    </form>
  );
}
