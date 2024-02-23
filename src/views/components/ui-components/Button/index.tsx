import styles from './index.module.scss';
import type { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  shape,
  Icon,
}) => {
  return (
    <button
      className={`${styles.button} ${styles['button' + shape]} `}
      onClick={onClick}
    >
      {content}
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
};
