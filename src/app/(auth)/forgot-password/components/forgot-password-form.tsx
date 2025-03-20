'use client';
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

// COMPONENTS
import { withErrorBoundaryTrigger } from '@/hoc/error-boundary-trigger';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import NavLink from '@/components/nav-link/nav-link';

function ForgotPasswordForm({
  triggerGlobalError,
}: IWithErrorBoundaryTriggerProps) {
  // ============================| RENDER |============================ //
  return (
    <form
      action={() => {}}
      className="flex w-full flex-col justify-center gap-4"
      noValidate
    >
      <Input inputType="email" inputLabel="E-mail" name="email" />

      <Button fullWidth size="lg" type="submit" isLoading={false}>
        Reset my password
      </Button>

      <div className="flex items-center justify-center">
        <NavLink href={'/'} variant="light">
          Return to home page
        </NavLink>
      </div>
    </form>
  );
}

export default withErrorBoundaryTrigger(ForgotPasswordForm);
