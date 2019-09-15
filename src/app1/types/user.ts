import { ResetAllAction } from './common';

export interface NewUser {
  email: string;
  name: string;
  phone: string;
}

export interface User extends NewUser {
  id: number;
}

export interface UserState {
  byId: { [id: number]: User };
  allIds: number[];
}

export const ADD_USERS = 'ADD_USERS';
// export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

interface AddUsersAction {
  type: typeof ADD_USERS;
  users: User[];
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
  id: number;
}

export type UserAction = AddUsersAction | DeleteUserAction | ResetAllAction;
