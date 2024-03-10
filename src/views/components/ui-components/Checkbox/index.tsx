import styles from './index.module.scss';
import type { CheckboxProps } from './types';

export const Checkbox: React.FC<CheckboxProps> = ({
  setIsChecked,
  isChecked,
}) => {
  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        onChange={setIsChecked}
      />
      <div className={styles.customCheckbox}></div>
    </label>
  );
};
