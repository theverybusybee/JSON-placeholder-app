import { useEffect } from 'react';
import styles from './index.module.scss';
import { Post } from 'views/components/ui-components/Post';
import { useAppDispatch } from 'app/hooks';
import {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
} from 'slices/postsSlice';
import { FilterSection } from 'views/components/sections/FilterSection';
import { PostList } from 'views/components/sections/PostList';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getUsersAsync());
    dispatch(getCommentsAsync());
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
      <PostList />
    </main>
  );
};

export default App;
