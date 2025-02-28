import { IAvatarImageProps } from '@/components/avatar-image/types';

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

export default function AvatarImage({ size = 'md' }: IAvatarImageProps) {
  return (
    <div className="flex items-center">
      <div className="relative">
        <img
          className={`${sizeClasses[size]} rounded-full object-cover`}
          src="https://randomuser.me/api/portraits/women/87.jpg"
          alt="Avatar"
        />
      </div>
    </div>
  );
}
