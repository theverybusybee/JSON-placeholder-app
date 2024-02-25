export interface PaginationProps {
  pagesAmount: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, pageNumber: number) => void;
  currentPageState: number;
  extraClass?: string;
}
