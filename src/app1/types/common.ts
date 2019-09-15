import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserState } from './user';

export interface AppState {
  user: UserState;
}

export type ThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

export const RESET_ALL = 'RESET_ALL';

export interface ResetAllAction {
  type: typeof RESET_ALL;
}
