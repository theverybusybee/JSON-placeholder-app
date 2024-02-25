import clsx from 'clsx';
import styles from './index.module.scss';
import { ButtonShape, type ButtonProps, ButtonBorderStyle } from './types';
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
      {hasArrow && <ArrowDown className={styles.icon} />}
    </button>
  );
};
