import { type Post } from 'slices/postsSlice/types';

export const getPagesAmount = (
  isFilterActive: boolean,
  posts: Post[],
  filteredPosts: Post[],
  postsAmount: string,
) => {
  const countPages = isFilterActive
    ? filteredPosts.length / +postsAmount
    : posts.length / +postsAmount;

  return countPages < 1 ? 0 : Math.ceil(countPages);
};

export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const generateId = (): string => {
  return (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
  );
};

export const handlePostsAmount = (postsNumber: string) => {
  localStorage.setItem('postsAmount', postsNumber);
};