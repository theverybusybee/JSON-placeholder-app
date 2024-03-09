import styles from './index.module.scss';
import type { PostsSectionProps } from './types';
import clsx from 'clsx';
import { PostList } from '../PostList';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  deletePostAsync,
  selectFilter,
  selectFilteredPosts,
  selectPosts,
  toggleFavorites,
  toggleIsChecked,
} from 'slices/postsSlice';
import { useMemo, useState } from 'react';
import { Pagination } from 'views/components/ui-components/Pagination';
import { Button } from 'views/components/ui-components/Button';
import type { Post } from 'slices/postsTypes';

export const PostsSection: React.FC<PostsSectionProps> = ({
  postsAmount,
  extraClass,
}) => {
  const posts = useAppSelector(selectPosts);
  const filteredPosts = useAppSelector(selectFilteredPosts);

  const { isActive: isFilterActive } = useAppSelector(selectFilter);
  const [currentPageState, setCurrentPageState] = useState<number>(1);
  const dispatch = useAppDispatch();

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

  const getAllCheckedPosts = (
    handlePostsState: (isFavoritesTruePosts: Post[]) => void,
  ) => {
    const isCheckedTruePosts = posts.filter((post) => post.isChecked);
    return handlePostsState(isCheckedTruePosts);
  };

  const deleteAllCheckedPosts = (posts: Post[]) => {
    if (posts.length) {
      posts.forEach((post) => dispatch(deletePostAsync(post.id)));
    }
  };

  const likeAllCheckedPosts = (posts: Post[]) => {
    if (posts.length) {
      posts.forEach((post) => dispatch(toggleFavorites(post.id)));
    }
  };

  const resetAllCheckedPosts = (posts: Post[]) => {
    if (posts.length) {
      posts.forEach((post) => dispatch(toggleIsChecked(post.id)));
    }
  };

  const pagesAmount = Math.floor(
    isFilterActive
      ? filteredPosts.length / +postsAmount
      : posts.length / +postsAmount,
  );

  const isPostsHighlighted = posts.some((post) => post.isChecked);

  const buttonContainerClass = clsx(styles.buttonContainer, {
    [styles.buttonContainer_active]: isPostsHighlighted,
  });

  return (
    <section
      className={clsx([styles.section, extraClass])}
      aria-label="Список постов"
    >
      <div className={buttonContainerClass}>
        <Button
          content="delete"
          onClick={() => getAllCheckedPosts(deleteAllCheckedPosts)}
        />
        <Button
          content="like"
          onClick={() => getAllCheckedPosts(likeAllCheckedPosts)}
        />
        <Button
          content="reset"
          onClick={() => getAllCheckedPosts(resetAllCheckedPosts)}
        />
      </div>
      {currentPosts.length !== 0 ? (
        <PostList extraClass={styles.postList} posts={currentPosts} />
      ) : (
        <p className={styles.content}>Ничего не найдено</p>
      )}
      <Pagination
        extraClass={styles.pagination}
        onClick={handleChangePage}
        currentPageState={currentPageState}
        pagesAmount={currentPosts.length ? pagesAmount : 1}
      />
    </section>
  );
};
