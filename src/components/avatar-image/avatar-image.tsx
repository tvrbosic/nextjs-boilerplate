// ASSETS
import AvatarPlaceholder from '@/assets/images/avatar.png';

// TYPES
import { IAvatarImageProps } from '@/components/avatar-image/types';
import Image from 'next/image';

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

export default function AvatarImage({
  size = 'md',
  imageSrc,
}: IAvatarImageProps) {
  // Use the provided imageSrc or fallback to the placeholder
  const avatarSrc = imageSrc || AvatarPlaceholder;

  return (
    <div className="flex items-center">
      <div className="relative">
        <Image
          src={avatarSrc}
          className={`${sizeClasses[size]} rounded-full object-cover`}
          alt="Avatar"
        />
      </div>
    </div>
  );
}
