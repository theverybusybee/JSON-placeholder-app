import { useState } from 'react';
import styles from './index.module.scss';
import type { DropdownProps } from './types';

export const Dropdown: React.FC<DropdownProps> = ({
  extraClass,
  users,
  onClick,
}) => {
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const openDropDownMenu = () => {
    setIsDropDownActive(true);
  };

  const closeDropDownMenu = () => {
    setIsDropDownActive(false);
  };

  return (
    <article
      className={`${styles.dropdown} ${extraClass}`}
      onMouseOver={openDropDownMenu}
      onMouseOut={closeDropDownMenu}
    >
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
    </article>
  );
};
