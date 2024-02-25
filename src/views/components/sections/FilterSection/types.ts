export interface FilterSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onUsernameFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onFavoritesFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  extraClass?: string;
}
