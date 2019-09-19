// https://kentcdodds.com/blog/how-to-use-react-context-effectively
// https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052

import React, { createContext, useContext, useReducer } from 'react';
import { UserState, UserAction, ADD_USERS, DELETE_USER, RESET_ALL } from 'app2/types';
import { initialState, userReducer, getAll } from 'app2/reducers/user';
import api from 'app2/api';

// context

type Dispatch = (action: UserAction) => void;
type ContextProps = { state: UserState; dispatch: Dispatch };
type ProviderProps = React.PropsWithChildren<{}>;

const UserStateContext = createContext({} as ContextProps);

export const UserProvider = (props: ProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const value = { state, dispatch };
  return <UserStateContext.Provider value={value} {...props} />;
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

// actions

export const fetchUsers = async (dispatch: Dispatch) => {
  const users = await api.fetchUsers();
  if (users && users.length) {
    dispatch({ type: ADD_USERS, users });
  }
};

export const deleteUser = async (dispatch: Dispatch, id: number) => {
  await api.deleteUser(id);
  dispatch({ type: DELETE_USER, id });
};

export const resetAll = (dispatch: Dispatch) => {
  dispatch({ type: RESET_ALL });
};

// getters

export const getUsers = (state: UserState) => {
  return getAll(state);
};
