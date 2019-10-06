import { createSelector } from 'reselect';
import { AppState } from 'app1/types';
import * as fromPost from 'app1/store/reducers/post';

const post = (state: AppState) => state.post;

export const selectPosts = createSelector(
  post,
  fromPost.getAll,
);
