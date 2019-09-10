import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const App1 = () => {
  return (
    <View style={styles.body}>
      <Text>App1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App1;
