import { TComponentSize } from '@/types/theme';

export type TEditIconStyle = 'default'; // NOTE: Extend with styles and add classes in styles.ts (light, dark, inverse, etc.)

export interface IAvatarImageProps {
  size?: TComponentSize;
  imageSrc?: string; // The source URL of the image (optional - placheolder will be used)
  editIconStyle?: TEditIconStyle;
  onEdit?: () => void;
}
