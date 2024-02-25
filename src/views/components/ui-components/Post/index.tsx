import { useState } from 'react';
import { Checkbox } from '../Checkbox';
import styles from './index.module.scss';
import type { PostProps } from './types';
import { Button } from '../Button';
import Arrow from 'assets/images/icons/arrow-down.svg?react';
import BinIcon from 'assets/images/icons/bin-icon.svg?react';
import EditIcon from 'assets/images/icons/edit-icon.svg?react';
import HeartIcon from 'assets/images/icons/heart-icon.svg?react';
import HeartIconSolid from 'assets/images/icons/heart-icon-solid.svg?react';

import { ButtonBorderStyle, ButtonShape } from '../Button/types';
import { FeedbackList } from 'views/components/sections/FeedbackList';

export const Post: React.FC<PostProps> = ({
  user,
  username,
  title,
  content,
  onDelete,
  isFavorite,
  isChecked,
  onCheck,
  onLike,
  comments,
}) => {
  const [isFeedbackOpened, setIsFeedbackOpened] = useState<boolean>(false);

  return (
    <article className={styles.article}>
      <div className={styles.usernameContainer}>
        <p className={`${styles.content} ${styles.content_bold}`}>{user}</p>
        <p className={styles.content}>@{username}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.iconButton} onClick={onDelete}>
          <BinIcon />
        </button>
        <button className={styles.iconButton} onClick={onLike}>
          {isFavorite ? (
            <HeartIconSolid className={styles.likeButton_solid} />
          ) : (
            <HeartIcon />
          )}
        </button>
        <button className={styles.iconButton}>
          <EditIcon />
        </button>
      </div>

      <div className={styles.postContainer}>
        <p className={`${styles.content} ${styles.content_bold}`}>{title}</p>
        <p className={styles.content}>{content}</p>
      </div>

      <div
        className={`${styles.feedbackButtonWrapper} ${isFeedbackOpened ? styles.feedbackButtonWrapper_active : ''}`}
      >
        <Button
          extraClass={`${styles.feedbackButton}`}
          content="Показать комментарии"
          shape={ButtonShape.RoundedSquare}
          onClick={() => {
            setIsFeedbackOpened(!isFeedbackOpened);
          }}
          borderStyle={ButtonBorderStyle.Gradient}
          isActive={isFeedbackOpened}
          Icon={Arrow}
        />
      </div>

      <div className={styles.checkboxContainer}>
        <p>Выделить пост:</p>
        <Checkbox isChecked={isChecked} setIsChecked={onCheck} />
      </div>
      {isFeedbackOpened && (
        <FeedbackList
          extraClass={styles.feedbackList}
          feedbackList={comments}
        />
      )}
    </article>
  );
};
