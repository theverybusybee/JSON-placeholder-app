import type { User } from 'slices/postsTypes';

export interface DropdownProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  extraClass?: string;
  users: User[];
}
