import { PostsAmount } from 'slices/postsSlice/types';

export const PostsAmountMockData: PostsAmountMockData[] = [
  { amount: PostsAmount.Ten },
  { amount: PostsAmount.Twenty },
  { amount: PostsAmount.TwentyFive },
  { amount: PostsAmount.Fifty },
  { amount: PostsAmount.OneHundred },
  { amount: PostsAmount.All },
];

interface PostsAmountMockData {
  amount: PostsAmount;
}
