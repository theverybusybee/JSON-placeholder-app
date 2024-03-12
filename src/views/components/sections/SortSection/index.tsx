import styles from './index.module.scss';
import type { SortSectionProps } from './types';
import { Button } from 'views/components/ui-components/Button';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Direction } from 'slices/postsTypes';
import {
  filter,
  selectFilter,
  selectPostsAmount,
  setFilterDirection,
  setFilterPostsAmount,
} from 'slices/postsSlice';
import { ButtonShape } from 'views/components/ui-components/Button/types';
import PlusIcon from 'assets/images/icons/plus-icon.svg?react';
import { buttonsAmountMockData } from 'utils/mock-data';

export const SortSection: React.FC<SortSectionProps> = ({
  allPostsAmount,
  onAddPost,
  extraClass,
}) => {
  const dispatch = useAppDispatch();
  const postsAmount = useAppSelector(selectPostsAmount);

  const { params: filterParams } = useAppSelector(selectFilter);

  const handleSortAscending = () => {
    dispatch(setFilterDirection(Direction.Ascending));
    dispatch(filter());
  };

  const handleSortDescending = () => {
    dispatch(setFilterDirection(Direction.Descending));
    dispatch(filter());
  };

  return (
    <section className={clsx(styles.section, extraClass)}>
      <article className={styles.buttonsContainer}>
        <p>direction:</p>
        <Button
          isActive={filterParams.direction === Direction.Ascending}
          content="ascending"
          onClick={() => handleSortAscending()}
        />
        <Button
          isActive={filterParams.direction === Direction.Descending}
          content="descending"
          onClick={() => handleSortDescending()}
        />
      </article>
      <article className={styles.buttonsContainer}>
        <p>posts shown per page:</p>
        {buttonsAmountMockData.map((el, index) => (
          <Button
            key={index}
            content={el.amount}
            isActive={
              el.amount === postsAmount ||
              (el.amount === 'все' && postsAmount === allPostsAmount)
            }
            onClick={() => {
              dispatch(
                setFilterPostsAmount(
                  el.amount === 'все' ? allPostsAmount : el.amount.toString(),
                ),
              );
            }}
          />
        ))}
      </article>
      <Button
        content="Add new post"
        shape={ButtonShape.RoundedSquare}
        Icon={PlusIcon}
        onClick={onAddPost}
      />
    </section>
  );
};
