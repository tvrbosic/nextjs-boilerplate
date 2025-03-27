// LIB
import Image from 'next/image';

// ASSETS
import AvatarPlaceholder from '@/assets/images/avatar.png';

// TYPES
import { IAvatarImageProps } from '@/components/avatar-image/types';

// STYLES
import { SIZES } from '@/components/avatar-image/styles';

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
          className={`${SIZES[size]} rounded-full object-cover`}
          alt="Avatar"
        />
      </div>
    </div>
  );
}
