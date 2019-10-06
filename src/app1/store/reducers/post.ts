import {
  Post,
  PostState,
  PostsById,
  PostsByUserId,
  PostAction,
  ADD_POSTS,
  DELETE_USER,
} from 'app1/types';

const normalize = (posts: Post[]) => {
  return posts.reduce((obj: PostsById, p: Post) => {
    obj[p.id] = p;
    return obj;
  }, {});
};

const normalizeByUserId = (posts: Post[]) => {
  return posts.reduce((obj: PostsByUserId, p: Post) => {
    obj[p.userId] = obj[p.userId] ? obj[p.userId].concat(p.id) : [p.id];
    return obj;
  }, {});
};

const initialState: PostState = {
  byId: {},
  byUserId: {},
  allIds: [],
};

export default function reducer(state = initialState, action: PostAction): PostState {
  switch (action.type) {
    case ADD_POSTS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...normalize(action.posts),
        },
        byUserId: {
          ...state.byUserId,
          ...normalizeByUserId(action.posts),
        },
        allIds: [...new Set(state.allIds.concat(action.posts.map(p => p.id)))],
      };
    case DELETE_USER:
      const newState = { ...state };
      const postIds = newState.byUserId[action.id] || [];
      newState.allIds = state.allIds.filter(id => !postIds.includes(id));
      delete newState.byUserId[action.id];
      return newState;
    default:
      return state;
  }
}

export const getAll = (state: PostState) => state.allIds.map(id => state.byId[id]);
export const getById = (state: PostState, id: number) => state.byId[id];
