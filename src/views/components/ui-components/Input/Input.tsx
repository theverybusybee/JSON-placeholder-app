import { type InputProps } from './type';
import styles from './index.module.scss';

export function Input({
  name,
  isRequired,
  type,
  value,
  onChange,
  placeholder,
  minLength,
  maxLength,
  validationContent,
}: InputProps) {
  const CustomTag = type;

  return (
    <label className={styles.label} htmlFor={name}>
      <CustomTag
        className={styles.input}
        type={type}
        required={isRequired}
        name={name}
        value={value}
        defaultValue={''}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {validationContent && (
        <span className={styles.input__error}>{validationContent}</span>
      )}
    </label>
  );
}
