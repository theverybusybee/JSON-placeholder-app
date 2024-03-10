export interface PaginationProps {
  pagesAmount: number;
  onClick: (pageNumber: number) => void;
  currentPageState: number;
  extraClass?: string;
}
