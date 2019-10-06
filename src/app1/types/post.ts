import { User, DeleteUserAction } from './user';

export interface NewPost {
  userId: User['id'];
  title: string;
  body: string;
}

export interface Post extends NewPost {
  id: number;
}

export type PostsById = Record<Post['id'], Post>;
export type PostsByUserId = Record<User['id'], Post['id'][]>;
export type PostIds = Post['id'][];

export interface PostState {
  byId: PostsById;
  byUserId: PostsByUserId;
  allIds: PostIds;
}

export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

interface AddPostsAction {
  type: typeof ADD_POSTS;
  posts: Post[];
}

interface DeletePostAction {
  type: typeof DELETE_POST;
  id: Post['id'];
}

export type PostAction = AddPostsAction | DeletePostAction | DeleteUserAction;
