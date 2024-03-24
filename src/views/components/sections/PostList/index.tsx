import styles from './index.module.scss';
import type { PostListProps } from './types';
import { Post } from 'views/components/ui-components/Post';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  filter,
  selectComments,
  selectUsers,
  setClickedPostId,
  toggleFavorites,
  toggleIsChecked,
} from 'slices/postsSlice';
import clsx from 'clsx';
import { useCallback } from 'react';
import { setIsModalOpenedTrue } from 'slices/modalsSlice';
import { ModalType } from 'slices/modalsSlice/types';

export const PostList: React.FC<PostListProps> = ({ posts, extraClass }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const comments = useAppSelector(selectComments);

  const handleDelete = useCallback(
    (postId: number) => {
      dispatch(setIsModalOpenedTrue(ModalType.Approvement));
      dispatch(setClickedPostId(postId));
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
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (postId: number) => {
      dispatch(setIsModalOpenedTrue(ModalType.EditPost));
      dispatch(setClickedPostId(postId));
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
              onEdit={() => handleEdit(id)}
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
