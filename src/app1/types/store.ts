import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserState } from './user';
import { PostState } from './post';

export interface AppState {
  user: UserState;
  post: PostState;
}

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;
