import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Post } from 'views/components/ui-components/Post';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  selectPosts,
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
  selectUsers,
  selectComments,
  deletePostAsync,
  toggleFavorites,
  toggleIsChecked,
} from 'slices/postsSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const users = useAppSelector(selectUsers);
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(getUsersAsync());
    dispatch(getCommentsAsync());
  }, []);

  const handleDelete = (postId: number) => {
    dispatch(deletePostAsync(postId));
  };

  const handleFavorites = (postId: number) => {
    dispatch(toggleFavorites(postId));
  };

  const handleCheck = (postId: number) => {
    dispatch(toggleIsChecked(postId));
  };

  return (
    <div>
      <ul className={styles.posts}>
        {posts.length > 0 ? (
          posts.map((post) => {
            const { id, userId, title, body, isChecked, isFavorite } = post;
            const user = users.find((user) => user.id === userId);
            const feedback = comments.filter(
              (comment) => comment.postId === id,
            );
            return (
              <li key={id}>
                <Post
                  user={user ? user.name : 'anonymous'}
                  username={user ? user.username : 'anonymous'}
                  title={title}
                  content={body}
                  isChecked={isChecked}
                  isFavorite={isFavorite}
                  onCheck={() => handleCheck(id)}
                  onDelete={() => handleDelete(id)}
                  onLike={() => handleFavorites(id)}
                  comments={feedback.length ? feedback : []}
                ></Post>
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default App;
