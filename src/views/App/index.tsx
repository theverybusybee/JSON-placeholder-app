import { useEffect } from 'react';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
  selectPosts,
  selectPostsAmount,
  selectStatus,
} from 'slices/postsSlice';
import { FilterSection } from 'views/components/sections/FilterSection';
import { PostsSection } from 'views/components/sections/PostsSection';
import { SortSection } from 'views/components/sections/SortSection';
import { selectIsModalOpened, setIsModalOpenedTrue } from 'slices/modalsSlice';
import { ModalType } from 'slices/modalsSlice/types';
import { PopupHandler } from 'views/components/popup/PopupHandler';
import { Status } from 'slices/postsSlice/types';

const App = () => {
  const dispatch = useAppDispatch();
  const postsAmount = useAppSelector(selectPostsAmount);
  const postsRequestStatus = useAppSelector(selectStatus);
  const posts = useAppSelector(selectPosts);
  const isModalOpened = useAppSelector(selectIsModalOpened);

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getUsersAsync());
    dispatch(getCommentsAsync());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('postsAmount', postsAmount);
  }, [postsAmount]);

  return (
    <main className={styles.main}>
      <FilterSection
        value=""
        onFavoritesFilter={() => {}}
        onUsernameFilter={() => {}}
      />
      <SortSection
        allPostsAmount={posts.length.toString()}
        onAddPost={() => dispatch(setIsModalOpenedTrue(ModalType.CreatePost))}
      />
      {postsRequestStatus === Status.Loading ? (
        <p>Loading</p>
      ) : (
        <PostsSection />
      )}
      <PopupHandler isModalOpened={isModalOpened} />
    </main>
  );
};

export default App;
