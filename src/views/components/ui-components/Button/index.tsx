import styles from './index.module.scss';
import { ButtonShape, type ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  shape = ButtonShape.Rounded,
  Icon,
  extraClass,
}) => {
  return (
    <button
      className={`${styles.button} ${styles['button' + shape]} ${extraClass}`}
      onClick={onClick}
    >
      {content}
      {Icon && <Icon className={styles.icon} />}
    </button>
  );
};
