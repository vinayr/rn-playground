import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '@src/app3/navigation/types';

const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const onPressUsers = async () => {
    navigation.navigate('UserList');
  };

  const onPressPosts = () => {
    navigation.navigate('PostList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button title="Users" onPress={onPressUsers} />
      </View>
      <View style={styles.button}>
        <Button title="Posts" onPress={onPressPosts} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 5,
  },
});

export default Home;
