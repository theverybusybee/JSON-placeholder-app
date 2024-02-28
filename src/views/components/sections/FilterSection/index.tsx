import styles from './index.module.scss';
import type { FilterSectionProps } from './types';
import { SubmitInput } from 'views/components/ui-components/SubmitInput';
import { Button } from 'views/components/ui-components/Button';
import clsx from 'clsx';
import { useState } from 'react';
import { Dropdown } from 'views/components/ui-components/Dropdown';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  filter,
  selectFilter,
  selectUsers,
  setFilterSearchRequest,
  toggleFilterIsFavorites,
} from 'slices/postsSlice';

export const FilterSection: React.FC<FilterSectionProps> = ({ extraClass }) => {
  const dispatch = useAppDispatch();
  const { params: filterParams } = useAppSelector(selectFilter);
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const users = useAppSelector(selectUsers);

  const toggleDropDownMenu = () => {
    setIsDropDownActive((prev) => !prev);
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setFilterSearchRequest(e.target.value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!filterParams.searchRequest) return;
    dispatch(filter());
    dispatch(setFilterSearchRequest(''));
  }

  const handleFilterByFavorites = () => {
    dispatch(toggleFilterIsFavorites());
    dispatch(filter());
  };

  return (
    <section
      className={clsx([styles.inputSection, extraClass])}
      aria-label="Поиск по постам"
    >
      <SubmitInput
        value={filterParams.searchRequest}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        placeholder={'Введите название поста'}
      />
      <div
        className={styles.dropdownContainer}
        onMouseOut={toggleDropDownMenu}
        onMouseOver={toggleDropDownMenu}
      >
        <Button
          content={filterParams.username ? filterParams.username : 'по имени'}
          extraClass={styles.button}
          hasArrow={true}
          isActive={isDropDownActive}
        />
        {isDropDownActive && <Dropdown users={users} />}
      </div>

      <Button
        content="избранное"
        extraClass={styles.button}
        isActive={filterParams.isFavorites}
        onClick={handleFilterByFavorites}
      />
    </section>
  );
};
