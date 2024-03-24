import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  deletePostAsync,
  filter,
  selectClickedPostId,
  resetClickedPostId,
} from 'slices/postsSlice';
import { Popup } from '../popup';
import { PopupContentCreatePost } from 'views/components/popup/content/PopupContentCreatePost';
import { selectModalType } from 'slices/modalsSlice';
import { ModalType } from 'slices/modalsSlice/types';
import { PopupContentApprovement } from 'views/components/popup/content/PopupContentApprovement';
import { PopupContentEditPost } from '../content/PopupContentEditPost';
import { type PopupHandlerProps } from './types';

export const PopupHandler: React.FC<PopupHandlerProps> = () => {
  const dispatch = useAppDispatch();
  const modalType = useAppSelector(selectModalType);
  const clickedPostId = useAppSelector(selectClickedPostId);
  const handleDelete = useCallback(
    (postId: number) => {
      dispatch(deletePostAsync(postId));
      dispatch(filter());
      dispatch(resetClickedPostId());
    },
    [dispatch],
  );

  const PopupApproveDeletion = (
    <Popup
      title="Are you sure you want to delete this post"
      titlePosition="left"
    >
      <PopupContentApprovement onApprove={() => handleDelete(clickedPostId)} />
    </Popup>
  );

  const PopupCreatePost = (
    <Popup title="Add new post">
      <PopupContentCreatePost />
    </Popup>
  );

  const PopupEditPost = (
    <Popup title="Edit post">
      <PopupContentEditPost />
    </Popup>
  );

  switch (modalType) {
    case ModalType.Approvement: {
      return PopupApproveDeletion;
    }
    case ModalType.CreatePost: {
      return PopupCreatePost;
    }
    case ModalType.EditPost: {
      return PopupEditPost;
    }
    default:
      return PopupEditPost;
  }
};
