import styles from './index.module.scss';
import { ButtonShape, type ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  shape = ButtonShape.Rounded,
  Icon,
  isActive = false,
  borderStyle,
  extraClass,
}) => {
  return (
    <button
      className={`${styles.button} ${styles['button' + shape]} ${styles['button' + borderStyle]} ${isActive ? styles.button_active : ''} ${extraClass}`}
      onClick={onClick}
    >
      {content}
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
};
