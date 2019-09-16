import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { UserProvider } from './contexts/user';

import Home from './components/home';
import UserList from './components/user/list';
import UserProfile from './components/user/profile';

const AppNavigator = createStackNavigator(
  {
    Home,
    UserList,
    UserProfile,
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App1 = () => (
  <UserProvider>
    <AppContainer />
  </UserProvider>
);

export default App1;
