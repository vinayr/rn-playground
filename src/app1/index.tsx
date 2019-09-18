import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navigator from './navigation';

const App1 = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App1;
