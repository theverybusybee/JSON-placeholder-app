import styles from './index.module.scss';
import type { FilterSectionProps } from './types';
import { SubmitInput } from 'views/components/ui-components/SubmitInput';
import { Button } from 'views/components/ui-components/Button';
import clsx from 'clsx';
import { useState } from 'react';
import { Dropdown } from 'views/components/ui-components/Dropdown';
import { useAppSelector } from 'app/hooks';
import { selectUsers } from 'slices/postsSlice';

export const FilterSection: React.FC<FilterSectionProps> = ({
  value,
  onChange,
  onSubmit,
  onUsernameFilter,
  onFavoritesFilter,
  extraClass,
}) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const users = useAppSelector(selectUsers);
  console.log(isDropDownActive);

  const openDropDownMenu = () => {
    setIsDropDownActive(true);
  };

  const closeDropDownMenu = () => {
    setIsDropDownActive(false);
  };

  const [inputState, setInputState] = useState<string>('');
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputState) return;
    setInputState('');
  }

  return (
    <section
      className={clsx([styles.inputSection, extraClass])}
      aria-label="Поиск по постам"
    >
      <SubmitInput
        value={inputState}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        placeholder={'Введите название поста'}
      />
      <div
        className={styles.dropdownContainer}
        onMouseOut={closeDropDownMenu}
        onMouseOver={openDropDownMenu}
      >
        <Button
          content="по имени"
          extraClass={styles.button}
          onClick={onUsernameFilter}
          hasArrow={true}
          isActive={isDropDownActive}
        />
        {isDropDownActive && <Dropdown users={users} onClick={() => {}} />}
      </div>

      <Button
        content="избранное"
        extraClass={styles.button}
        onClick={onFavoritesFilter}
      />
    </section>
  );
};
