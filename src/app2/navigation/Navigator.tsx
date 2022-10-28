import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions as NSNO } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import Home from '@src/app2/screens/home/Home';
import UserList from '@src/app2/screens/users/UserList';
import PostList from '@src/app2/screens/posts/PostList';

const title = (headerTitle: string): NSNO => ({ headerTitle });

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ ...title('Home') }} />
      <Stack.Screen name="UserList" component={UserList} options={{ ...title('Users') }} />
      <Stack.Screen name="PostList" component={PostList} options={{ ...title('Posts') }} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
