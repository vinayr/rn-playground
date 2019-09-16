import React from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={styles.body}>
      <Button title="Users" onPress={() => navigate('UserList')} />
    </SafeAreaView>
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
