import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { UserProvider } from 'app2/contexts/user';

import Home from 'app2/components/home';
import UserList from 'app2/components/user/list';
import UserProfile from 'app2/components/user/profile';

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
