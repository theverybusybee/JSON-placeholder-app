import type { Direction } from 'slices/postsSlice/types';

export interface SortSectionProps {
  allPostsAmount: string;
  onAddPost: () => void;
  extraClass?: string;
}

export type SortState = {
  direction: Direction;
  pagesAmount: string;
};
