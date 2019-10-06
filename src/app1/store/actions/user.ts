import api from 'app1/services/api';
import { User, UserAction, ThunkResult, ADD_USERS, DELETE_USER } from 'app1/types';

const addUsers = (users: User[]): UserAction => ({ type: ADD_USERS, users });
const delUser = (id: number): UserAction => ({ type: DELETE_USER, id });

export const fetchUsers = (): ThunkResult<void> => async dispatch => {
  const users = await api.fetchUsers();
  if (users && users.length) {
    dispatch(addUsers(users));
  }
};

export const deleteUser = (id: number): ThunkResult<void> => dispatch => {
  api.deleteUser(id);
  dispatch(delUser(id));
};
