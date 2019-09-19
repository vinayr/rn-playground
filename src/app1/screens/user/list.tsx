import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationScreenComponent, NavigationScreenProps } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';
import { connect, useDispatch } from 'react-redux';
import { AppState, User } from 'app1/types';
import { selectUsers } from 'app1/store/selectors';
import { fetchUsers, resetAll } from 'app1/store/actions';
import Loading from 'app1/components/loading';
import Empty from 'app1/components/empty';
import Error from 'app1/components/error';

interface ItemProps {
  user: User;
}

const Item: React.FC<ItemProps> = ({ user }) => {
  console.log('User');
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate('UserProfile', { user });
  };

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.name}>{user.name}</Text>
    </TouchableOpacity>
  );
};

interface ListProps extends NavigationScreenProps {
  users: User[];
}

const List: NavigationScreenComponent<{}, {}, ListProps> = ({ users }) => {
  console.log('UserList', users.length);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(fetchUsers());
      setIsError(false);
    } catch (error) {
      console.log('getUsers error', error.message);
      setIsError(true);
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    getUsers();
    return () => {
      dispatch(resetAll());
    };
  }, [dispatch, getUsers]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error onPress={fetchUsers} />;
  }

  if (!users.length) {
    return <Empty text="No Users" />;
  }

  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Item user={item} />}
        keyExtractor={item => `${item.id}`}
      />
    </SafeAreaView>
  );
};

List.navigationOptions = {
  title: 'Users',
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
  },
});

export default connect((state: AppState) => ({
  users: selectUsers(state),
}))(List);
