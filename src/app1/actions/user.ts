import api from '../api';
import { ThunkResult, IUser } from '../interfaces';
import { ADD_USERS, CLEAR_ALL } from '../constants';

const addUsers = (users: IUser[]) => ({ type: ADD_USERS, users });

export const clearAll = () => ({ type: CLEAR_ALL });

export const getUsers = (): ThunkResult<void> => async dispatch => {
  console.log('GETUSERS ACTION');
  const users = await api.getUsers();
  // console.log('users', users);
  if (users.length) {
    dispatch(addUsers(users));
  }
};
