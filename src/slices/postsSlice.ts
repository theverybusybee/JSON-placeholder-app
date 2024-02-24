import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from 'app/createAppSlice';
import { getComments, getPosts, getUsers } from 'utils/fetches';
import type { Post, PostsSliceState, User, Comment } from './postsTypes';

const initialState: PostsSliceState = {
  posts: [],
  users: [],
  comments: [],
  status: 'idle',
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const postsSlice = createAppSlice({
  name: 'posts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    // increment: create.reducer((state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // }),
    deletePost: create.reducer((state, action: PayloadAction<number>) => {
      state.posts.filter((post) => post.id !== action.payload);
    }),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    // incrementByAmount: create.reducer(
    //   (state, action: PayloadAction<number>) => {
    //     state.value += action.payload;
    //   },
    // ),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    getPostsAsync: create.asyncThunk(
      async (_: void) => {
        const response: Post[] = await getPosts();
        console.log(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.posts = action.payload;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      },
    ),
    getCommentsAsync: create.asyncThunk(
      async (_: void) => {
        const response: Comment[] = await getComments();
        console.log(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.comments = action.payload;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      },
    ),
    getUsersAsync: create.asyncThunk(
      async (_: void) => {
        const response: User[] = await getUsers();
        console.log(response);
        // The value we return becomes the `fulfilled` action payload
        return response;
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.users = action.payload;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      },
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectPosts: (posts) => posts.posts,
    selectUsers: (posts) => posts.users,
    selectComments: (posts) => posts.comments,
    selectStatus: (posts) => posts.status,
  },
});

// Action creators are generated for each case reducer function.
export const {
  getPostsAsync,
  getUsersAsync,
  getCommentsAsync,
  deletePost,
  // increment, incrementByAmount, incrementAsync
} = postsSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectPosts, selectUsers, selectComments, selectStatus } =
  postsSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectPosts(getPosts());

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
