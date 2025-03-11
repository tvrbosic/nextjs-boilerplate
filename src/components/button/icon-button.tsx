// TYPES
import { IIconButtonProps } from '@/components/button/types';

// STYLES
import styles from '@/components/button/styles.module.css';

export default function IconButton({ icon, onClick }: IIconButtonProps) {
  return (
    <span className={styles.icon_button} onClick={onClick}>
      {icon}
    </span>
  );
}
