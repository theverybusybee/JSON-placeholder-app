import styles from './index.module.scss';
import type { SortSectionProps } from './types';
import { Button } from 'views/components/ui-components/Button';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Direction } from 'slices/postsTypes';
import {
  filter,
  selectFilter,
  selectFilteredPosts,
  selectPosts,
  selectPostsAmount,
  setFilterDirection,
  setFilterPostsAmount,
} from 'slices/postsSlice';

const buttonsAmountMockData = [
  { amount: '10' },
  { amount: '20' },
  { amount: '25' },
  { amount: '50' },
  { amount: '100' },
  { amount: 'все' },
];

export const SortSection: React.FC<SortSectionProps> = ({
  allPostsAmount,
  extraClass,
}) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const filteredPosts = useAppSelector(selectFilteredPosts);
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
    </section>
  );
};
