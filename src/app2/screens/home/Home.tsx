import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Button } from 'react-native';
import { RootStackScreenProps } from '@/app2/navigation/types';
import { useAppDispatch, useAppSelector } from '@/app2/app/store';
import { postActions, postSelectors } from '@/app2/screens/posts/redux';
import { userActions, userSelectors } from '@/app2/screens/users/redux';
import Loading from '@/app2/components/Loading';

const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const dispatch = useAppDispatch();
  const loadingPosts = useAppSelector(postSelectors.loading);
  const loadingUsers = useAppSelector(userSelectors.loading);

  useEffect(() => {
    async function loadData() {
      await dispatch(userActions.getUsers());
      await dispatch(postActions.getPosts());
    }
    loadData();
  }, [dispatch]);

  if (loadingPosts || loadingUsers) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button title="Users" onPress={() => navigation.navigate('UserList')} />
      </View>
      <View style={styles.button}>
        <Button title="Posts" onPress={() => navigation.navigate('PostList')} />
      </View>
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
  button: {
    margin: 5,
  },
});

export default Home;
