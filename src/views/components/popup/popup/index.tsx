import { useEffect } from 'react';
import styles from './index.module.scss';
import type { PopupProps } from './types';
import { createPortal } from 'react-dom';
import { modalRoot } from 'utils/constants';
import CloseIcon from 'assets/images/icons/close-icon.svg?react';
import { PopupOverlay } from '../PopupOverlay';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectIsModalOpened, setIsModalOpenedFalse } from 'slices/modalsSlice';
import clsx from 'clsx';

export const Popup: React.FC<PopupProps> = ({
  children,
  title,
  titlePosition = 'center',
}) => {
  const dispatch = useAppDispatch();
  const isModalOpened = useAppSelector(selectIsModalOpened);

  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(setIsModalOpenedFalse());
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isModalOpened, dispatch]);

  const titleClass = clsx(styles.title, {
    [styles['title_position__' + titlePosition]]: titlePosition,
  });

  const handleModalClose = () => {
    dispatch(setIsModalOpenedFalse());
  };

  return (
    modalRoot &&
    createPortal(
      <PopupOverlay onClose={handleModalClose} isOpened={isModalOpened}>
        <article className={styles.popup}>
          <button className={styles.closeButton} onClick={handleModalClose}>
            <CloseIcon />
          </button>
          <h2 className={titleClass}>{title}</h2>
          {children}
        </article>
      </PopupOverlay>,
      modalRoot,
    )
  );
};
