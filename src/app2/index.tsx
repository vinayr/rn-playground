import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './app/store';
import Navigator from './navigation/Navigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaProvider>
  );
}
