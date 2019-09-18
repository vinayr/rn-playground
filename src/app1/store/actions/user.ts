import api from '../../services/api';
import { User, UserAction, ThunkResult, ADD_USERS, RESET_ALL, DELETE_USER } from '../../types';

const addUsers = (users: User[]): UserAction => ({ type: ADD_USERS, users });
const delUser = (id: number): UserAction => ({ type: DELETE_USER, id });
export const resetAll = (): UserAction => ({ type: RESET_ALL });

export const fetchUsers = (): ThunkResult<void> => async dispatch => {
  const users = await api.fetchUsers();
  if (users && users.length) {
    dispatch(addUsers(users));
  }
};

export const deleteUser = (id: number): ThunkResult<void> => async dispatch => {
  await api.deleteUser(id);
  dispatch(delUser(id));
};
