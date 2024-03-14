import styles from './index.module.scss';
import type { PostListProps } from './types';
import { Post } from 'views/components/ui-components/Post';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  deletePostAsync,
  filter,
  selectComments,
  selectUsers,
  toggleFavorites,
  toggleIsChecked,
} from 'slices/postsSlice/postsSlice';
import clsx from 'clsx';
import { useCallback } from 'react';

export const PostList: React.FC<PostListProps> = ({ posts, extraClass }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const comments = useAppSelector(selectComments);

  const handleDelete = useCallback(
    (postId: number) => {
      dispatch(deletePostAsync(postId));
      dispatch(filter());
    },
    [dispatch],
  );

  const handleFavorites = useCallback(
    (postId: number) => {
      dispatch(toggleFavorites(postId));
      dispatch(filter());
    },
    [dispatch],
  );

  const handleCheck = useCallback(
    (postId: number) => {
      dispatch(toggleIsChecked(postId));
      dispatch(filter());
    },
    [dispatch],
  );

  return (
    <ul className={clsx(styles.postList, extraClass)}>
      {posts.map((post) => {
        const { id, userId, title, body, isChecked, isFavorite } = post;
        const user = users.find((user) => user.id === userId);
        const feedback = comments.filter((comment) => comment.postId === id);
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
            />
          </li>
        );
      })}
    </ul>
  );
};
