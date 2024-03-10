export interface PostProps {
  user: string;
  username: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isChecked: boolean;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCheck: () => void;
  comments: {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }[];
}
