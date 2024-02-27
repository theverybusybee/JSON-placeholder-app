export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  isFavorite: boolean;
  isChecked: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export enum Direction {
  Ascending = 'ascending',
  Descending = 'descending',
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostsSliceState {
  posts: Post[];
  users: User[];
  comments: Comment[];
  status: 'idle' | 'loading' | 'failed';
  filter: {
    searchRequest: string;
    direction: Direction;
    username: string;
    postsAmount: string;
  };
}
