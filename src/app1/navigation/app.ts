import { createStackNavigator } from 'react-navigation-stack';
import { NavigationStackScreenOptions } from 'react-navigation-stack/lib/typescript/types';

import Home from '../screens/home';
import UserList from '../screens/user/list';
import UserProfile from '../screens/user/profile';

const navigatorConfig: NavigationStackScreenOptions = {
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
};

const routeConfig = {
  Home: {
    screen: Home,
  },
  UserList: {
    screen: UserList,
  },
  UserProfile: {
    screen: UserProfile,
  },
};

const AppNavigator = createStackNavigator(routeConfig, navigatorConfig);

export default AppNavigator;
