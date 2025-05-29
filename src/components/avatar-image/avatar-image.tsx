// LIBRARY
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';

// ASSETS
import AvatarPlaceholder from '@/assets/images/avatar.png';

// TYPES
import { IAvatarImageProps } from '@/components/avatar-image/types';

// STYLES
import { EDIT_BUTTON, SIZES } from '@/components/avatar-image/styles';

export default function AvatarImage({ size = 'md', imageSrc, editIconStyle = 'default', onEdit }: IAvatarImageProps) {
  // Use the provided imageSrc or fallback to the placeholder
  const avatarSrc = imageSrc || AvatarPlaceholder;

  return (
    <div className="flex items-center">
      <div className="relative">
        <Image
          src={avatarSrc}
          className={`${SIZES[size]} rounded-full object-cover`}
          alt="Avatar"
          width={128}
          height={128}
        />

        {onEdit && (
          <div className={EDIT_BUTTON[editIconStyle]}>
            <span onClick={onEdit}>
              <FaEdit />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
