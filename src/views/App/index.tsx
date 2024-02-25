import { useEffect } from 'react';
import styles from './index.module.scss';
import { useAppDispatch } from 'app/hooks';
import {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
} from 'slices/postsSlice';
import { FilterSection } from 'views/components/sections/FilterSection';
import { PostsSection } from 'views/components/sections/PostsSection';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getUsersAsync());
    dispatch(getCommentsAsync());
    localStorage.setItem('postsAmount', '10');
  }, []);

  return (
    <main className={styles.main}>
      <FilterSection
        value="kkfdf"
        onChange={() => {}}
        onSubmit={() => {}}
        onFavoritesFilter={() => {}}
        onUsernameFilter={() => {}}
      />
      <PostsSection />
    </main>
  );
};

export default App;
