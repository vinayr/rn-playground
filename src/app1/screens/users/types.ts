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
export const DELETE_USER = 'DELETE_USER';
export const RESET_ALL = 'RESET_ALL';

interface AddUsersAction {
  type: typeof ADD_USERS;
  users: User[];
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
  id: number;
}

export interface ResetAllAction {
  type: typeof RESET_ALL;
}

export type UserAction = AddUsersAction | DeleteUserAction | ResetAllAction;
