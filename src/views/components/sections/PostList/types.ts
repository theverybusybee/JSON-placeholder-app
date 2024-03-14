import type { Post } from 'slices/postsSlice/postsTypes';

export interface PostListProps {
  posts: Post[];
  extraClass?: string;
}
