import { useEffect } from 'react';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
  selectPosts,
  selectFilter,
} from 'slices/postsSlice';
import { FilterSection } from 'views/components/sections/FilterSection';
import { PostsSection } from 'views/components/sections/PostsSection';
import { SortSection } from 'views/components/sections/SortSection';
import { handlePostsAmount } from 'utils/constants';

const App = () => {
  const dispatch = useAppDispatch();
  const { postsAmount } = useAppSelector(selectFilter);
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getUsersAsync());
    dispatch(getCommentsAsync());
  }, []);

  useEffect(() => {
    handlePostsAmount(postsAmount);
  }, [postsAmount]);

  return (
    <main className={styles.main}>
      <FilterSection
        value="kkfdf"
        onChange={() => {}}
        onSubmit={() => {}}
        onFavoritesFilter={() => {}}
        onUsernameFilter={() => {}}
      />
      <SortSection allPostsAmount={posts.length.toString()} />
      <PostsSection postsAmount={postsAmount} />
    </main>
  );
};

export default App;
