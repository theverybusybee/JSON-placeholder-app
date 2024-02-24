export interface PostProps {
  user: string;
  username: string;
  title: string;
  content: string;
  comments?: {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }[];
}
