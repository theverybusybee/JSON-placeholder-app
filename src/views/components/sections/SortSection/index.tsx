import styles from './index.module.scss';
import type { SortSectionProps } from './types';
import { Button } from 'views/components/ui-components/Button';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Direction, PostsAmount } from 'slices/postsSlice/types';
import {
  filter,
  selectFilter,
  selectPostsAmount,
  setFilterDirection,
  setPostsAmount,
} from 'slices/postsSlice';
import { ButtonShape } from 'views/components/ui-components/Button/types';
import PlusIcon from 'assets/images/icons/plus-icon.svg?react';
import type { PostsAmountMockData} from 'utils/mock-data';
import { postsAmountMockData } from 'utils/mock-data';

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

  const handlePostsAmountPerPage = (post: PostsAmountMockData) => {
    dispatch(setPostsAmount(post.amount));
  };

  return (
    <section className={clsx(styles.section, extraClass)}>
      <article className={styles.buttonsContainer}>
        <p>direction:</p>
        <Button
          isActive={filterParams.direction === Direction.Descending}
          content="descending"
          onClick={() => handleSortDescending()}
        />
        <Button
          isActive={filterParams.direction === Direction.Ascending}
          content="ascending"
          onClick={() => handleSortAscending()}
        />
      </article>
      <article className={styles.buttonsContainer}>
        <p>posts shown per page:</p>
        {postsAmountMockData.map((el, index) => (
          <Button
            key={index}
            content={el.amount}
            isActive={
              el.amount === postsAmount ||
              (el.amount === PostsAmount.All && postsAmount === allPostsAmount)
            }
            onClick={() => {
              handlePostsAmountPerPage(el);
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
