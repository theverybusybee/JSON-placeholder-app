import styles from './index.module.scss';
import type { SortSectionProps } from './types';
import { Button } from 'views/components/ui-components/Button';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Direction } from 'slices/postsTypes';
import { selectFilter, setDirection, setPostsAmount } from 'slices/postsSlice';

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
  extraClass,
}) => {
  const dispatch = useAppDispatch();
  const { postsAmount } = useAppSelector(selectFilter);

  return (
    <section className={clsx(styles.section, extraClass)}>
      <article className={styles.buttonsContainer}>
        <p>направление:</p>
        <Button
          content="возрастание"
          onClick={() => dispatch(setDirection(Direction.Ascending))}
        />
        <Button
          content="убывание"
          onClick={() => dispatch(setDirection(Direction.Descending))}
        />
      </article>
      <article className={styles.buttonsContainer}>
        <p>количество постов на странице:</p>
        {buttonsAmountMockData.map((el, index) => (
          <Button
            content={el.amount}
            isActive={
              el.amount === postsAmount ||
              (el.amount === 'все' && postsAmount === allPostsAmount)
            }
            onClick={() => {
              dispatch(
                setPostsAmount(
                  el.amount === 'все' ? allPostsAmount : el.amount.toString(),
                ),
              );
            }}
          />
        ))}
      </article>
    </section>
  );
};
