import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';

const Home = () => {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Users" onPress={() => navigate('Users')} />
    </SafeAreaView>
  );
};

Home.navigationOptions = {
  title: 'Home',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
