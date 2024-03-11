import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
  selectPosts,
  selectPostsAmount,
} from 'slices/postsSlice';
import { FilterSection } from 'views/components/sections/FilterSection';
import { PostsSection } from 'views/components/sections/PostsSection';
import { SortSection } from 'views/components/sections/SortSection';
import { handlePostsAmount } from 'utils/constants';
import { Popup } from 'views/components/popup/popup';

const App = () => {
  const dispatch = useAppDispatch();
  const postsAmount = useAppSelector(selectPostsAmount);
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getUsersAsync());
    dispatch(getCommentsAsync());
  }, []);

  useEffect(() => {
    handlePostsAmount(postsAmount);
  }, [postsAmount]);

  const [isPopupOpened, setIsPopupOpened] = useState(true);

  const handleOpenPopup = () => {
    setIsPopupOpened(true);
    if (typeof window != 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpened(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <main className={styles.main}>
      <FilterSection
        value="kkfdf"
        onFavoritesFilter={() => {}}
        onUsernameFilter={() => {}}
      />
      <SortSection allPostsAmount={posts.length.toString()} />
      <PostsSection postsAmount={postsAmount} />
      <Popup isOpened={isPopupOpened} onClose={handleClosePopup}>
        <></>
      </Popup>
    </main>
  );
};

export default App;
