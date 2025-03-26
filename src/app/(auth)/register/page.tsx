import CenteredContent from '@/components/layout/centered-content';
import RegisterForm from '@/app/(auth)/register/components/register-form';

export default function RegisterPage() {
  return (
    <CenteredContent>
      {/** Content container */}
      <div className="bg-primary flex h-[620px] w-[500px] flex-col items-center justify-center rounded-2xl px-8 py-4">
        <h1 className="mb-2 text-2xl text-stone-100 underline underline-offset-4">
          Register
        </h1>

        <RegisterForm />
      </div>
    </CenteredContent>
  );
}
