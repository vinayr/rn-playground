import { createStackNavigator } from 'react-navigation-stack';

import Home from 'app1/screens/home';
import UserList from 'app1/screens/user/list';
import UserProfile from 'app1/screens/user/profile';

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

export default AppNavigator;
