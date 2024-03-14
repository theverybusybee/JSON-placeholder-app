import type { User } from 'slices/postsSlice/postsTypes';

export interface DropdownProps {
  extraClass?: string;
  users: User[];
}
