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

import { ButtonShape } from '../Button/types';

export const Post: React.FC<PostProps> = ({
  user,
  username,
  title,
  content,
  comments,
}) => {
  const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  return (
    <article className={styles.article}>
      <div className={styles.usernameContainer}>
        <p className={`${styles.content} ${styles.content_bold}`}>{user}</p>
        <p className={styles.content}>{username}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.iconButton}>
          <BinIcon />
        </button>
        <button
          className={styles.iconButton}
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? (
            <HeartIcon />
          ) : (
            <HeartIconSolid className={styles.likeButton_solid} />
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

      <Button
        extraClass={styles.feedbackButton}
        content="Показать комментарии"
        shape={ButtonShape.RoundedSquare}
        onClick={() => {}}
        Icon={Arrow}
      />
      <div className={styles.checkboxContainer}>
        <p>Выделить пост:</p>
        <Checkbox
          isChecked={checkboxState}
          setIsChecked={() => setCheckboxState(!checkboxState)}
        />
      </div>
    </article>
  );
};
