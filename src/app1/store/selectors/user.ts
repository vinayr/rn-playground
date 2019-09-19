import { createSelector } from 'reselect';
import { AppState } from 'app1/types';
import * as fromUser from 'app1/store/reducers/user';

const getId = (_: AppState, id: number) => id;
const user = (state: AppState) => state.user;

export const selectUsers = createSelector(
  user,
  fromUser.getAll,
);

export const selectUser = createSelector(
  user,
  getId,
  fromUser.getById,
);
