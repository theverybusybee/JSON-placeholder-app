import clsx from 'clsx';
import styles from './index.module.scss';
import { ButtonShape, type ButtonProps } from './types';
import ArrowDown from 'assets/images/icons/arrow-down.svg?react';

export const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  onMouseOver,
  onMouseOut,
  shape = ButtonShape.Rounded,
  borderStyle,
  hasArrow = false,
  isActive = false,
  Icon,
  extraClass,
}) => {
  const buttonClass = clsx(
    styles.button,
    {
      [styles['button_shape' + shape]]: shape,
      [styles['button_borderStyle' + borderStyle]]: borderStyle,
      [styles.button_active]: isActive,
    },
    extraClass,
  );

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {content}
      {Icon && <Icon className={styles.icon} />}
      {hasArrow && <ArrowDown className={styles.arrow} />}
    </button>
  );
};
