import styles from './index.module.scss';
import type { DropdownProps } from './types';
import { useAppDispatch } from 'app/hooks';
import { filter, setFilterUsername } from 'slices/postsSlice';

export const Dropdown: React.FC<DropdownProps> = ({ extraClass, users }) => {
  const dispatch = useAppDispatch();

  const handleFilterByUsername = (userName: string) => {
    dispatch(setFilterUsername(userName));
    dispatch(filter());
  };

  return (
    <article className={styles.dropdown}>
      <div className={`${styles.dropdownContent} ${extraClass}`}>
        <ul className={styles.buttonList}>
          {users.length > 0 &&
            users.map((user) => {
              return (
                <li className={styles.buttonItem} key={user.id}>
                  <button
                    className={styles.button}
                    onClick={() => handleFilterByUsername(user.name)}
                  >
                    {user.name}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </article>
  );
};
