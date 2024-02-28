import styles from './index.module.scss';
import type { PostsSectionProps } from './types';
import clsx from 'clsx';
import { PostList } from '../PostList';
import { useAppSelector } from 'app/hooks';
import {
  selectFilter,
  selectFilteredPosts,
  selectPosts,
} from 'slices/postsSlice';
import { useMemo, useState } from 'react';
import { Pagination } from 'views/components/ui-components/Pagination';

export const PostsSection: React.FC<PostsSectionProps> = ({
  postsAmount,
  extraClass,
}) => {
  const posts = useAppSelector(selectPosts);
  const filteredPosts = useAppSelector(selectFilteredPosts);

  const { isActive: isFilterActive } = useAppSelector(selectFilter);
  const [currentPageState, setCurrentPageState] = useState<number>(1);

  const currentPosts = useMemo(() => {
    const startIndex = +postsAmount * (currentPageState! - 1);
    const endIndex = startIndex + +postsAmount;
    const filteredArray = isFilterActive
      ? [...filteredPosts].slice(startIndex, endIndex)
      : [...posts].slice(startIndex, endIndex);

    return filteredArray;
  }, [posts, filteredPosts, postsAmount, currentPageState]);

  const handleChangePage = (pageNumber: number) => {
    setCurrentPageState(pageNumber);
  };

  const pagesAmount = Math.floor(
    isFilterActive
      ? filteredPosts.length / +postsAmount
      : posts.length / +postsAmount,
  );

  console.log(pagesAmount);

  return (
    <section
      className={clsx([styles.section, extraClass])}
      aria-label="Список постов"
    >
      {currentPosts.length !== 0 ? (
        <PostList posts={currentPosts} />
      ) : (
        <p className={styles.content}>Ничего не найдено</p>
      )}
      <Pagination
        onClick={handleChangePage}
        currentPageState={currentPageState}
        pagesAmount={currentPosts.length ? pagesAmount : 1}
      />
    </section>
  );
};
