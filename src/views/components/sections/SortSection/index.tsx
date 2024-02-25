import styles from './index.module.scss';
import type { SortSectionProps } from './types';
import { Button } from 'views/components/ui-components/Button';
import clsx from 'clsx';

const buttonsAmountMockData = [
  { amount: '10' },
  { amount: '20' },
  { amount: '25' },
  { amount: '50' },
  { amount: '100' },
  { amount: 'все' },
];

export const SortSection: React.FC<SortSectionProps> = ({
  allPostsAmount,
  sortState,
  setSortState,
  extraClass,
}) => {
  return (
    <section className={clsx(styles.section, extraClass)}>
      <article className={styles.buttonsContainer}>
        <p>направление:</p>
        <Button content="возрастание" onClick={() => {}} />
        <Button content="убывание" onClick={() => {}} />
      </article>
      <article className={styles.buttonsContainer}>
        <p>количество постов на странице:</p>
        {buttonsAmountMockData.map((el, index) => (
          <Button
            content={el.amount}
            isActive={
              el.amount === sortState.pagesAmount ||
              (el.amount === 'все' && sortState.pagesAmount === allPostsAmount)
            }
            onClick={() => {
              setSortState({
                ...sortState,
                pagesAmount:
                  el.amount === 'все' ? allPostsAmount : el.amount.toString(),
              });
            }}
          />
        ))}
      </article>
    </section>
  );
};
