import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Thunk, RootState } from '@src/app2/app/store';
import { postActions } from '@src/app2/screens/posts/redux';
import { User, UserState } from './types';
import * as api from './api';

// Actions, Reducer

const initialState: UserState = {
  byId: {},
  allIds: [],
  loading: false,
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingUsers: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    loadUsers: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        if (!state.allIds.includes(user.id)) {
          state.allIds.push(user.id);
          state.byId[user.id] = user;
        }
      });
    },
    delUser: (state, action: PayloadAction<string>) => {
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
  },
});

const { loadingUsers, loadUsers, delUser } = slice.actions;

// Thunks

const getUsers = (): Thunk<Promise<void>> => async (dispatch) => {
  dispatch(loadingUsers(true));
  const users = await api.fetchUsers();
  if (users && users.length) {
    dispatch(loadUsers(users));
  }
  dispatch(loadingUsers(false));
};

// prettier-ignore
const deleteUser = (id: string): Thunk<Promise<void>> => async (dispatch) => {
  await api.deleteUser(id);
  dispatch(delUser(id));
  dispatch(postActions.deleteUserPosts(id));
};

// Selectors

const usersSelector = (state: RootState) => state.users;

const userSelectors = {
  loading: createSelector(usersSelector, (users) => users.loading),
  userIds: createSelector(usersSelector, (users) => users.allIds),
  makeSelectUser: () => (id: string) => createSelector(usersSelector, (users) => users.byId[id]),
};

export default slice.reducer;
export { userSelectors };
export const userActions = {
  getUsers,
  deleteUser,
};
