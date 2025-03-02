'use client';
// LIB
import { useActionState } from 'react';

// APP
import { AuthApiClient } from '@/api-clients/auth/auth-client';

// COMPONENTS
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';

export default function LoginForm() {
  const [loginResponse, loginAction, isPending] = useActionState(async (previous, formData) => {
    console.log(formData)
    return  await AuthApiClient.instance.login(formData);    
  }, null);

  console.log(loginResponse)
  
  
  

  return (
    <form
      action={loginAction}
      className="w-full flex flex-col space-y-4 justify-center"
    >
      <Input inputType="email" inputLabel="E-mail" name='email' />

      <Input inputType="password" inputLabel="Password" name='password' />

      <div className="text-end">
        <NavLink href={'/forgot-password'} size="sm">
          Forgot password?
        </NavLink>
      </div>

      <div className="mt-3">
        <Button fill size="lg" type="submit">
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
