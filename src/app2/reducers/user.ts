import { User, UserState, UserAction, ADD_USERS, DELETE_USER, RESET_ALL } from 'app2/types';

type UserList = Record<User['id'], User>;

const normalize = (users: User[]) => {
  return users.reduce((obj: UserList, u: User) => {
    obj[u.id] = u;
    return obj;
  }, {});
};

export const initialState: UserState = {
  byId: {},
  allIds: [],
};

export function userReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case ADD_USERS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...normalize(action.users),
        },
        allIds: state.allIds.concat(action.users.map((u: User) => u.id)),
      };
    case DELETE_USER:
      const newState: UserState = {
        ...state,
        allIds: state.allIds.filter(id => id !== action.id),
      };
      delete newState.byId[action.id];
      return newState;
    case RESET_ALL:
      return initialState;
    default:
      return state;
  }
}

export const getAll = (state: UserState) => state.allIds.map(id => state.byId[id]);
export const getById = (state: UserState, id: number) => state.byId[id];
