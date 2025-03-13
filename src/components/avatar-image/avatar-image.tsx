// LIB
import Image from 'next/image';

// ASSETS
import AvatarPlaceholder from '@/assets/images/avatar.png';

// TYPES
import { IAvatarImageProps } from '@/components/avatar-image/types';

// STYLES
import styles from '@/components/avatar-image/styles.module.css';

const SIZE_CLASSES = {
  sm: styles.avatar_small,
  md: styles.avatar_medium,
  lg: styles.avatar_large,
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
          className={`${SIZE_CLASSES[size]} rounded-full object-cover`}
          alt="Avatar"
        />
      </div>
    </div>
  );
}
