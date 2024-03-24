import type { User } from 'slices/postsSlice/types';

export interface DropdownProps {
  extraClass?: string;
  users: User[];
}
