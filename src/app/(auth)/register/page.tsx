import CenteredContent from '@/components/layout/centered-content';
import RegisterForm from '@/app/(auth)/register/components/register-form';

export default function RegisterPage() {
  return (
    <CenteredContent>
      {/** Content container */}
      <div className="bg-primary flex h-[650px] w-[500px] flex-col items-center justify-center rounded-2xl px-8 py-4">
        <h1 className="text-title mb-2 text-2xl">Register</h1>

        <RegisterForm />
      </div>
    </CenteredContent>
  );
}
