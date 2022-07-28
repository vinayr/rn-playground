import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Thunk, RootState } from '@/app2/app/store';
import { Post, PostState } from './types';
import * as api from './api';

// Actions, Reducer

const initialState: PostState = {
  byId: {},
  byUserId: {},
  allIds: [],
  loading: false,
};

const slice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadingPosts: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loadPosts: (state, action: PayloadAction<Post[]>) => {
      action.payload.forEach((post) => {
        if (!state.allIds.includes(post.id)) {
          state.allIds.push(post.id);
          state.byId[post.id] = post;

          let userPostIds = state.byUserId[post.userId];
          if (!userPostIds) {
            state.byUserId[post.userId] = [post.id];
          } else {
            userPostIds.push(post.id);
          }
        }
      });
    },
    deleteUserPosts: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      const userPostIds = state.byUserId[userId];
      if (userPostIds) {
        userPostIds.forEach((postId) => {
          state.allIds = state.allIds.filter((id) => id !== postId);
        });
      }
      delete state.byUserId[userId];
    },
  },
});

const { loadingPosts, loadPosts, deleteUserPosts } = slice.actions;

// Thunks

const getPosts = (): Thunk<Promise<void>> => async (dispatch) => {
  dispatch(loadingPosts(true));
  const posts = await api.fetchPosts(1);
  if (posts && posts.length) {
    dispatch(loadPosts(posts));
  }
  dispatch(loadingPosts(false));
};

// Selectors

const postsSelector = (state: RootState) => state.posts;

const postSelectors = {
  loading: createSelector(postsSelector, (posts) => posts.loading),
  postIds: createSelector(postsSelector, (posts) => posts.allIds),
  makeSelectPost: () => (id: string) => createSelector(postsSelector, (posts) => posts.byId[id]),
};

export default slice.reducer;
export { postSelectors };
export const postActions = { getPosts, deleteUserPosts };
