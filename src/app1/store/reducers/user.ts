import { User, UserState, UsersById, UserAction, ADD_USERS, DELETE_USER } from 'app1/types';

const normalize = (users: User[]) => {
  return users.reduce((obj: UsersById, u: User) => {
    obj[u.id] = u;
    return obj;
  }, {});
};

const initialState: UserState = {
  byId: {},
  allIds: [],
};

export default function user(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case ADD_USERS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...normalize(action.users),
        },
        allIds: [...new Set(state.allIds.concat(action.users.map(u => u.id)))],
      };
    case DELETE_USER:
      return {
        ...state,
        allIds: state.allIds.filter(id => id !== action.id),
      };
    default:
      return state;
  }
}

export const getAll = (state: UserState) => state.allIds.map(id => state.byId[id]);
export const getById = (state: UserState, id: number) => state.byId[id];
