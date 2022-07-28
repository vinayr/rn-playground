import React from 'react';
import { StyleSheet, SafeAreaView, Button } from 'react-native';
import { RootStackScreenProps } from '@/app1/navigation/types';

const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
  return (
    <SafeAreaView style={styles.body}>
      <Button title="Users" onPress={() => navigation.navigate('UserList')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
