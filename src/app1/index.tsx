import React from 'react';
import { Provider } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import store from './store';
import Main from './components/Main';

interface IProps {
  // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  navigation: NavigationScreenProp<any>;
}

const App1 = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

App1.navigationOptions = ({ navigation }: IProps) => {
  return {
    title: navigation.state.routeName,
  };
};

export default App1;
