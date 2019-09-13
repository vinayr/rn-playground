import { AnyAction } from 'redux';
import { IUser, IUserState } from '../interfaces';
import { ADD_USERS, DELETE_USER, SELECTED_USER, CLEAR_ALL } from '../constants';

type UserList = Record<IUser['id'], IUser>;

const normalize = (users: IUser[]) => {
  return users.reduce((obj: UserList, u: IUser) => {
    obj[u.id] = u;
    return obj;
  }, {});
};

const initialState: IUserState = {
  byId: {},
  allIds: [],
  selectedId: null,
};

export default function user(state = initialState, action: AnyAction) {
  switch (action.type) {
    // case ADD_USERS:
    //   return {
    //     ...state,
    //     byId: normalize(action.users),
    //     allIds: action.users.map((u: User) => u.id),
    //   };
    case ADD_USERS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...normalize(action.users),
        },
        allIds: state.allIds.concat(action.users.map((u: IUser) => u.id)),
      };
    case DELETE_USER:
      const newState = {
        ...state,
        // byId: { ...state.byId },
        allIds: state.allIds.filter(id => id !== action.id),
        selectedId: null,
      };
      delete newState.byId[action.id];
      return newState;
    case SELECTED_USER:
      return {
        ...state,
        selectedId: action.id,
      };
    case CLEAR_ALL:
      return initialState;
    default:
      return state;
  }
}

export const getAll = (state: IUserState) => state.allIds.map(id => state.byId[id]);
export const getById = (state: IUserState, id: number) => state.byId[id];
export const getSelected = (state: IUserState) => (state.selectedId ? state.byId[state.selectedId] : null);
