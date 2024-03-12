import { useEffect } from 'react';
import styles from './index.module.scss';
import type { PopupProps } from './types';
import { createPortal } from 'react-dom';
import { modalRoot } from 'utils/constants';
import CloseIcon from 'assets/images/icons/close-icon.svg?react';
import { PopupOverlay } from '../PopupOverlay';

export const Popup: React.FC<PopupProps> = ({
  children,
  isOpened,
  onClose,
  title,
}) => {
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpened, onClose]);

  return (
    modalRoot &&
    createPortal(
      <PopupOverlay onClose={onClose} isOpened={isOpened}>
        <article className={styles.popup}>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
          <h2 className={styles.title}>{title}</h2>
          {children}
        </article>
      </PopupOverlay>,
      modalRoot,
    )
  );
};
