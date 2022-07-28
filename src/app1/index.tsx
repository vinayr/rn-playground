import React from 'react';
import Navigator from './navigation/Navigator';
import { UserProvider } from './screens/users/context';

const App = () => (
  <UserProvider>
    <Navigator />
  </UserProvider>
);

export default App;
