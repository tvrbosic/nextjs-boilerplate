import { IChildrenProps } from '@/types/global';

export default function CenteredContent({ children }: IChildrenProps) {
  return (
    <div className="relative">
      {/** Background */}
      <div className="bg-darkStone h-dvh w-full" />
      {/** Floating container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
