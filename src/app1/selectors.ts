import { createSelector } from 'reselect';
import { IStoreState } from './interfaces';
import * as fromUser from './reducers/user';

const getId = (_: IStoreState, id: number) => id;
const user = (state: IStoreState) => state.user;

/* eslint-disable prettier/prettier */

export const selectUsers = createSelector(user, fromUser.getAll);
export const selectUser = createSelector(user, getId, fromUser.getById);
export const selectUserSelected = createSelector(user, fromUser.getSelected);
