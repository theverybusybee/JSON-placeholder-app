import clsx from 'clsx';
import styles from './index.module.scss';
import type { PopupOverlayProps } from './types';

export const PopupOverlay: React.FC<PopupOverlayProps> = ({
  children,
  onClose,
  isOpened,
}) => {
  const handleClose = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'overlay') {
      onClose();
    }
  };

  const overlayClass = clsx(styles.overlay, {
    [styles.overlay_active]: isOpened,
  });

  return (
    <article className={overlayClass} onClick={handleClose} id="overlay">
      {children}
    </article>
  );
};
