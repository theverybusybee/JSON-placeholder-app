import { useEffect } from 'react';
import styles from './index.module.scss';
import type { PopupProps } from './types';
import { createPortal } from 'react-dom';
import { modalRoot } from 'utils/constants';
import CloseIcon from 'assets/images/icons/close-icon.svg?react';
import { PopupOverlay } from '../PopupOverlay';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectIsModalOpened, toggleIsOpened } from 'slices/modalsSlice';

export const Popup: React.FC<PopupProps> = ({ children, title }) => {
  const dispatch = useAppDispatch();
  const isModalOpened = useAppSelector(selectIsModalOpened);
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(toggleIsOpened());
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isModalOpened, dispatch]);

  return (
    modalRoot &&
    createPortal(
      <PopupOverlay
        onClose={() => dispatch(toggleIsOpened())}
        isOpened={isModalOpened}
      >
        <article className={styles.popup}>
          <button
            className={styles.closeButton}
            onClick={() => dispatch(toggleIsOpened())}
          >
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
