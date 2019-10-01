import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Button, Text } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import firebase from 'react-native-firebase';

const Home = () => {
  // const { navigate } = useNavigation();
  useEffect(() => {
    firebase
      .auth()
      .signInAnonymously()
      .then(credential => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON());
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <Text>Ahoy!!!!</Text>
      {/* <Button title="Users" onPress={() => navigate('UserList')} /> */}
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
