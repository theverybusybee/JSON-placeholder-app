import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
  selectPosts,
} from 'slices/postsSlice';
import { FilterSection } from 'views/components/sections/FilterSection';
import { PostsSection } from 'views/components/sections/PostsSection';
import { SortSection } from 'views/components/sections/SortSection';
import { handlePostsAmount } from 'utils/constants';
import type { SortState } from 'views/components/sections/SortSection/types';

const App = () => {
  const dispatch = useAppDispatch();
  const postsAmount = localStorage.getItem('postsAmount');

  const posts = useAppSelector(selectPosts);
  const [sortState, setSortState] = useState<SortState>({
    direction: 'ascending',
    pagesAmount: postsAmount ? postsAmount : '10',
  });

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getUsersAsync());
    dispatch(getCommentsAsync());
  }, []);

  useEffect(() => {
    handlePostsAmount(sortState.pagesAmount);
  }, [sortState.pagesAmount]);

  return (
    <main className={styles.main}>
      <FilterSection
        value="kkfdf"
        onChange={() => {}}
        onSubmit={() => {}}
        onFavoritesFilter={() => {}}
        onUsernameFilter={() => {}}
      />
      <SortSection
        setSortState={setSortState}
        sortState={sortState}
        allPostsAmount={posts.length.toString()}
      />
      <PostsSection postsAmount={sortState.pagesAmount} />
    </main>
  );
};

export default App;
