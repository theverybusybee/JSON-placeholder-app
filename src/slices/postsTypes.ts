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

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed',
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Filter {
  isActive: boolean;
  params: {
    searchRequest: string;
    direction: Direction;
    username: string;
    isFavorites: boolean;
  };
}

export interface PostsSliceState {
  posts: Post[];
  users: User[];
  comments: Comment[];
  status: Status;
  postsAmount: string;
  filter: Filter;
  filteredPosts: Post[];
}

export interface PostBody {
  title: string;
  content: string;
}
