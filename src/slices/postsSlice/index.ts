import { type PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from 'app/createAppSlice';
import {
  deletePost,
  getComments,
  getPosts,
  getUsers,
  postPost,
} from 'utils/fetches';
import {
  type Post,
  type PostsSliceState,
  type User,
  type Comment,
  Direction,
  Status,
  type PostBody,
} from './types';

const initialState: PostsSliceState = {
  posts: [],
  users: [],
  comments: [],
  status: Status.Idle,
  postsAmount:
    !localStorage.getItem('postsAmount') === null ||
    localStorage.getItem('postsAmount') === 'undefined' ||
    localStorage.getItem('postsAmount') === 'null'
      ? '10'
      : localStorage.getItem('postsAmount')!,
  filter: {
    isActive: false,
    params: {
      searchRequest: '',
      direction: Direction.Ascending,
      username: '',
      isFavorites: false,
    },
  },
  filteredPosts: [],
  clickedPostId: -1,
};

export const postsSlice = createAppSlice({
  name: 'posts',
  initialState,
  reducers: (create) => ({
    toggleFavorites: create.reducer<number>(
      (state, action: PayloadAction<number>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload,
        );
        if (index !== -1)
          state.posts[index].isFavorite = !state.posts[index].isFavorite;
      },
    ),

    toggleIsChecked: create.reducer<number>(
      (state, action: PayloadAction<number>) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload,
        );
        if (index !== -1)
          state.posts[index].isChecked = !state.posts[index].isChecked;
      },
    ),

    getPostsAsync: create.asyncThunk(
      async (_: void) => {
        const response: Post[] = await getPosts();
        return response;
      },
      {
        pending: (state) => {
          state.status = Status.Loading;
        },
        fulfilled: (state, action) => {
          state.status = Status.Idle;
          state.posts = action.payload.map((post) => {
            return { ...post, isFavorite: false, isChecked: false };
          });
        },
        rejected: (state) => {
          state.status = Status.Failed;
        },
      },
    ),

    getCommentsAsync: create.asyncThunk(
      async (_: void) => {
        const response: Comment[] = await getComments();
        return response;
      },
      {
        pending: (state) => {
          state.status = Status.Loading;
        },
        fulfilled: (state, action) => {
          state.status = Status.Loading;
          state.comments = action.payload;
        },
        rejected: (state) => {
          state.status = Status.Failed;
        },
      },
    ),

    getUsersAsync: create.asyncThunk(
      async (_: void) => {
        const response: User[] = await getUsers();
        return response;
      },
      {
        pending: (state) => {
          state.status = Status.Loading;
        },
        fulfilled: (state, action) => {
          state.status = Status.Idle;
          state.users = action.payload;
        },
        rejected: (state) => {
          state.status = Status.Failed;
        },
      },
    ),

    postPostAsync: create.asyncThunk(
      async (postBody: PostBody) => {
        const response: Post = await postPost(postBody);
        return response;
      },
      {
        pending: (state) => {
          state.status = Status.Loading;
        },
        fulfilled: (state, action) => {
          state.status = Status.Idle;

          const returnedPost = action.payload;

          const postId = state.posts.some((post) => post.id === returnedPost.id)
            ? returnedPost.id + 1
            : returnedPost.id;

          const newPost = {
            ...returnedPost,
            id: postId,
            isFavorite: false,
            isChecked: false,
          };
          state.posts = [newPost].concat(state.posts);
        },
        rejected: (state) => {
          state.status = Status.Failed;
        },
      },
    ),

    deletePostAsync: create.asyncThunk(
      async (postId: number) => {
        const response: {} = await deletePost(postId);
        return postId;
      },
      {
        pending: (state) => {
          state.status = Status.Loading;
        },
        fulfilled: (state, action) => {
          state.status = Status.Idle;
          state.posts = state.posts.filter(
            (post) => post.id !== action.payload,
          );
        },
        rejected: (state) => {
          state.status = Status.Failed;
        },
      },
    ),

    setFilterSearchRequest: create.reducer<string>(
      (state, action: PayloadAction<string>) => {
        if (!state.filter.isActive) state.filter.isActive = true;
        state.filter.params.searchRequest = action.payload;
      },
    ),

    setFilterDirection: create.reducer<Direction>(
      (state, action: PayloadAction<Direction>) => {
        state.filter.params.direction = action.payload;
      },
    ),

    setFilterUsername: create.reducer<string>(
      (state, action: PayloadAction<string>) => {
        if (!state.filter.isActive) state.filter.isActive = true;
        state.filter.params.username = action.payload;
      },
    ),

    setFilterPostsAmount: create.reducer<string>(
      (state, action: PayloadAction<string>) => {
        state.postsAmount = action.payload;
      },
    ),

    toggleFilterIsFavorites: create.reducer((state) => {
      if (!state.filter.isActive) state.filter.isActive = true;
      state.filter.params.isFavorites = !state.filter.params.isFavorites;
    }),

    filter: create.reducer((state) => {
      const { direction, isFavorites, searchRequest, username } =
        state.filter.params;

      if (direction === Direction.Ascending) {
        state.filteredPosts = state.posts.sort(
          (prevPost, currPost) => prevPost.id - currPost.id,
        );
      }

      if (direction === Direction.Descending) {
        state.filteredPosts = state.posts.sort(
          (prevPost, currPost) => currPost.id - prevPost.id,
        );
      }

      if (isFavorites) {
        state.filteredPosts = state.filteredPosts.filter(
          (post) => post.isFavorite,
        );
      }

      if (searchRequest) {
        const searchRequestExp = new RegExp(searchRequest, 'g');

        state.filteredPosts = state.filteredPosts.filter((post) =>
          searchRequestExp.test(post.title),
        );
      }

      if (username) {
        const user = state.users.find(
          (user) => user.name === state.filter.params.username,
        );
        if (!user) return;

        state.filteredPosts = state.filteredPosts.filter(
          (post) => post.userId === user.id,
        );
      }
    }),

    skipFilter: create.reducer((state) => {
      state.filter = {
        isActive: false,
        params: {
          searchRequest: '',
          direction: Direction.Ascending,
          username: '',
          isFavorites: false,
        },
      };
      state.filteredPosts = [];
    }),

    setClickedPostId: create.reducer((state, action: PayloadAction<number>) => {
      state.clickedPostId = action.payload;
    }),

    resetClickedPostId: create.reducer((state) => {
      state.clickedPostId = -1;
    }),
  }),

  selectors: {
    selectPosts: (posts) => posts.posts,
    selectUsers: (posts) => posts.users,
    selectComments: (posts) => posts.comments,
    selectStatus: (posts) => posts.status,
    selectFilter: (posts) => posts.filter,
    selectFilteredPosts: (posts) => posts.filteredPosts,
    selectPostsAmount: (posts) => posts.postsAmount,
    selectClickedPostId: (posts) => posts.clickedPostId,
  },
});

export const {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
  deletePostAsync,
  postPostAsync,
  toggleFavorites,
  toggleIsChecked,
  setFilterSearchRequest,
  setFilterDirection,
  setFilterUsername,
  setFilterPostsAmount,
  toggleFilterIsFavorites,
  filter,
  skipFilter,
  setClickedPostId,
  resetClickedPostId,
} = postsSlice.actions;

export const {
  selectPosts,
  selectUsers,
  selectComments,
  selectStatus,
  selectFilter,
  selectFilteredPosts,
  selectPostsAmount,
  selectClickedPostId,
} = postsSlice.selectors;
