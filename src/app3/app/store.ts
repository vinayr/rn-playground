import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '@src/app3/screens/users/api';
import { postApi } from '@src/app3/screens/posts/api';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
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
    middleware.push(userApi.middleware);
    middleware.push(postApi.middleware);
    return middleware;
  },
  devTools: __DEV__,
});

export default store;
