export interface SortSectionProps {
  extraClass?: string;
  allPostsAmount: string;
  sortState: SortState;
  setSortState: (sortState: SortState) => void;
}

export type SortState = {
  direction: 'ascending' | 'descending';
  pagesAmount: string;
};
