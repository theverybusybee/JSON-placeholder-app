export interface FilterSectionProps {
  value: string;
  onUsernameFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFavoritesFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  extraClass?: string;
}
