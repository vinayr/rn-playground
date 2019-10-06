import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';
import { fetchUsers, fetchPosts } from 'app1/store/actions';
import Loading from 'app1/components/loading';

const Home = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      await dispatch(fetchUsers());
      await dispatch(fetchPosts());
      setIsLoading(false);
    }
    loadData();
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button title="Users" onPress={() => navigate('Users')} />
      </View>
      <View style={styles.button}>
        <Button title="Posts" onPress={() => navigate('Posts')} />
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
