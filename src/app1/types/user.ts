export interface NewUser {
  email: string;
  name: string;
  phone: string;
}

export interface User extends NewUser {
  id: number;
}

export type UsersById = Record<User['id'], User>;
export type UserIds = User['id'][];

export interface UserState {
  byId: UsersById;
  allIds: UserIds;
}

export const ADD_USERS = 'ADD_USERS';
export const DELETE_USER = 'DELETE_USER';

interface AddUsersAction {
  type: typeof ADD_USERS;
  users: User[];
}

export interface DeleteUserAction {
  type: typeof DELETE_USER;
  id: User['id'];
}

export type UserAction = AddUsersAction | DeleteUserAction;
