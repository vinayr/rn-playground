import { createStackNavigator } from 'react-navigation-stack';
import { Colors } from 'app1/styles';
import Home from 'app1/screens/home';
import Users from 'app1/screens/users';

const AppNavigator = createStackNavigator(
  {
    Home,
    Users,
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
