import type { SyntheticEvent } from 'react';
import type { User } from 'slices/postsTypes';

export interface DropdownProps {
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  extraClass?: string;
  users: User[];
}
