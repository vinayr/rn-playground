import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.body}>
      <Button title="App1" onPress={() => navigate('App1')} />
    </View>
  );
};

Home.navigationOptions = {
  title: 'Home',
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
