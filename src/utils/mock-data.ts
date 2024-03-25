import { PostsAmount } from 'slices/postsSlice/types';

export const postsAmountMockData: PostsAmountMockData[] = [
  { amount: PostsAmount.Ten },
  { amount: PostsAmount.Twenty },
  { amount: PostsAmount.TwentyFive },
  { amount: PostsAmount.Fifty },
  { amount: PostsAmount.OneHundred },
  { amount: PostsAmount.All },
];

export interface PostsAmountMockData {
  amount: PostsAmount;
}
