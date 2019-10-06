import api from 'app1/services/api';
import { Post, PostAction, ThunkResult, ADD_POSTS } from 'app1/types';

const addPosts = (posts: Post[]): PostAction => ({ type: ADD_POSTS, posts });

export const fetchPosts = (): ThunkResult<void> => async dispatch => {
  const page = 1;
  const posts = await api.fetchPosts(page);
  if (posts && posts.length) {
    dispatch(addPosts(posts));
  }
};
