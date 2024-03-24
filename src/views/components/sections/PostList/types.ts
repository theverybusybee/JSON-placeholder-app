import type { Post } from 'slices/postsSlice/types';

export interface PostListProps {
  posts: Post[];
  extraClass?: string;
}
