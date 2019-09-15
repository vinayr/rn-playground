import { createSelector } from 'reselect';
import { AppState } from '../types';
import * as fromUser from '../reducers/user';

const getId = (_: AppState, id: number) => id;
const user = (state: AppState) => state.user;

/* eslint-disable prettier/prettier */

export const selectUsers = createSelector(user, fromUser.getAll);
export const selectUser = createSelector(user, getId, fromUser.getById);
