import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import postsReducer from '@src/app2/screens/posts/redux';
import usersReducer from '@src/app2/screens/users/redux';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    let middleware = getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
    // @ts-ignore
    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default;
      middleware.push(createDebugger());
    }
    return middleware;
  },
  devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type Thunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
