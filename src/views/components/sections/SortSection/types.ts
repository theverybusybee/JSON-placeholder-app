import type { Direction } from 'slices/postsTypes';

export interface SortSectionProps {
  allPostsAmount: string;
  onAddPost: () => void;
  extraClass?: string;
}

export type SortState = {
  direction: Direction;
  pagesAmount: string;
};
