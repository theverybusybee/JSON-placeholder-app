import styles from './index.module.scss';
import type { FeedbackProps } from './types';

export const Feedback: React.FC<FeedbackProps> = ({ name, email, body }) => {
  return (
    <article className={styles.article}>
      <div className={styles.usernameContainer}>
        <p className={`${styles.content} ${styles.content_bold}`}>
          User: {name}
        </p>
        <p className={styles.content}>email: {email}</p>
      </div>

      <div className={styles.postContainer}>
        {/* <p className={`${styles.content} ${styles.content_bold}`}>{title}</p> */}
        <p className={styles.content}>{body}</p>
      </div>
    </article>
  );
};
