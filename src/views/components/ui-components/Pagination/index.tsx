import clsx from 'clsx';
import styles from './index.module.scss';
import type { PaginationProps } from './types';
import { generateId } from 'utils/helpers';

export const Pagination: React.FC<PaginationProps> = ({
  currentPageState,
  onClick,
  pagesAmount,
  extraClass,
}) => {
  const pagesArr = [...Array(pagesAmount ? pagesAmount : 1).keys()].map((i) => {
    return { number: i + 1, id: generateId() };
  });

  const listItemClass = (pageNumber: number) =>
    clsx(styles.item, {
      [styles.item_active]: currentPageState === pageNumber,
    });

  return (
    <ul className={clsx(styles.list, extraClass)}>
      {pagesArr.length !== 0 &&
        pagesArr.map((page) => {
          return (
            <li className={listItemClass(page.number)} key={page.id}>
              <button
                className={styles.button}
                onClick={() => onClick(page.number)}
              >
                {page.number}
              </button>
            </li>
          );
        })}
    </ul>
  );
};
