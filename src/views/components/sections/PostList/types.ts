import type { Post } from 'slices/postsTypes';

export interface PostListProps {
  posts: Post[];
  extraClass?: string;
}
