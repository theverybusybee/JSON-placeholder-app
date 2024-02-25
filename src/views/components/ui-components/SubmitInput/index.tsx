import styles from './index.module.scss';
import type { SubmitInputProps } from './types';
import MagnifyingGlass from 'assets/images/icons/magnifying-glass-icon.svg?react';

export const SubmitInput: React.FC<SubmitInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        <input
          className={styles.input}
          placeholder={placeholder && placeholder}
          type="text"
          value={value}
          name="tasksSubmitInput"
          onChange={onChange}
        />
      </label>
      <button type="submit" className={styles.submitButton}>
        <MagnifyingGlass />
      </button>
    </form>
  );
};
