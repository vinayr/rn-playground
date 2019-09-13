import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface INewUser {
  email: string;
  name: string;
  phone: string;
}

export interface IUser extends INewUser {
  id: number;
}

export interface IUserState {
  byId: { [id: number]: IUser };
  allIds: number[];
  selectedId: number | null;
}

export interface IStoreState {
  user: IUserState;
}

export type ThunkResult<R> = ThunkAction<R, IStoreState, undefined, Action>;
