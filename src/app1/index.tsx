import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import store from './store';

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
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

export default App1;
