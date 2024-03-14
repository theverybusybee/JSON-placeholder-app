import type { Direction } from 'slices/postsSlice/postsTypes';

export interface SortSectionProps {
  allPostsAmount: string;
  onAddPost: () => void;
  extraClass?: string;
}

export type SortState = {
  direction: Direction;
  pagesAmount: string;
};
