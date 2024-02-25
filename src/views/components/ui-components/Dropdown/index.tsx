import { useState } from 'react';
import styles from './index.module.scss';
import type { DropdownProps } from './types';

export const Dropdown: React.FC<DropdownProps> = ({
  extraClass,
  users,
  onClick,
}) => {
  return (
    <article className={styles.dropdown}>
      <div className={`${styles.dropdownContent} ${extraClass}`}>
        <ul className={styles.buttonList}>
          {users.length > 0 &&
            users.map((user) => {
              return (
                <li className={styles.buttonItem} key={user.id}>
                  <button className={styles.button} onClick={onClick}>
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
