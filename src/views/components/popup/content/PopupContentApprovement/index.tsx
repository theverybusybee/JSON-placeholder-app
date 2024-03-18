import styles from './index.module.scss';
import type { PopupContentApprovementProp } from './types';
import { Button } from 'views/components/ui-components/Button';
import { useAppDispatch } from 'app/hooks';
import { setIsModalOpenedFalse } from 'slices/modalsSlice';

export const PopupContentApprovement: React.FC<PopupContentApprovementProp> = ({
  onApprove,
}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setIsModalOpenedFalse());
  };

  const handleApprove = () => {
    onApprove();
    handleClose();
  };

  return (
    <article className={styles.popupContent}>
      <Button
        extraClass={styles.button}
        content="Yes"
        onClick={handleApprove}
      />
      <Button extraClass={styles.button} content="No" onClick={handleClose} />
    </article>
  );
};
