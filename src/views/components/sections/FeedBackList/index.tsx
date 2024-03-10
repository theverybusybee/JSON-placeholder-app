import { Feedback } from 'views/components/ui-components/Feedback';
import styles from './index.module.scss';
import type { FeedbackListProps } from './types';

export const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbackList,
  extraClass,
}) => {
  return (
    <ul className={`${styles.feedbackList} ${extraClass}`}>
      {feedbackList.map((feedback) => {
        const { id, postId, name, email, body } = feedback;
        return (
          <li className={styles.feedbackItem} key={id}>
            {
              <Feedback
                id={id}
                postId={postId}
                name={name}
                email={email}
                body={body}
              />
            }
          </li>
        );
      })}
    </ul>
  );
};
