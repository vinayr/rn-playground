import { createStackNavigator } from 'react-navigation-stack';
import { Colors } from 'app1/styles';
import Home from 'app1/screens/home';
import Users from 'app1/screens/users';
import Posts from 'app1/screens/posts';

const AppNavigator = createStackNavigator(
  {
    Home,
    Users,
    Posts,
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.ORANGE,
      },
      headerTintColor: Colors.WHITE,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

export default AppNavigator;
