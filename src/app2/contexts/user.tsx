// https://kentcdodds.com/blog/how-to-use-react-context-effectively
// https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052

import React, { createContext, useContext, useReducer } from 'react';
import { UserState, UserAction, ADD_USERS, DELETE_USER, RESET_ALL } from '../types';
import { initialState, userReducer } from '../reducers/user';
import api from '../api';

type Dispatch = (action: UserAction) => void;
type ProviderProps = { children: React.ReactNode };

interface ContextProps {
  state: UserState;
  dispatch: Dispatch;
}

const UserStateContext = createContext({} as ContextProps);

export const UserProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const value = { state, dispatch };
  return <UserStateContext.Provider value={value}>{children}</UserStateContext.Provider>;
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

export const getUsers = async (dispatch: Dispatch) => {
  const users = await api.getUsers();
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
