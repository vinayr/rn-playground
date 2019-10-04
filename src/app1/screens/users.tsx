import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'app1/types';
import { selectUsers } from 'app1/store/selectors';
import { fetchUsers, deleteUser, resetAll } from 'app1/store/actions';
import Loading from 'app1/components/loading';
import Empty from 'app1/components/empty';
import Error from 'app1/components/error';

interface ItemProps {
  user: User;
}

const Item = (props: ItemProps) => {
  console.log('User');
  const { user } = props;
  const dispatch = useDispatch();
  const [isSelected, setIsSelected] = useState(false);

  const onSelect = () => {
    setIsSelected(!isSelected);
  };

  const onDelete = () => {
    dispatch(deleteUser(user.id));
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onSelect}>
        <Text style={styles.name}>{user.name}</Text>
      </TouchableOpacity>
      {isSelected && (
        <View style={styles.details}>
          <Text>{user.email + '\n' + user.phone}</Text>
          <TouchableOpacity onPress={onDelete}>
            <Text>delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const List: NavigationStackScreenComponent = () => {
  const users = useSelector(selectUsers);
  console.log('UserList', users.length);
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
  }, [getUsers, dispatch]);

  useEffect(() => {
    navigation.setParams({ userCount: users.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.length]);

  if (isError) {
    return <Error onPress={getUsers} />;
  }

  if (!isLoading && !users.length) {
    return <Empty text="No Users" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Item user={item} />}
        keyExtractor={item => `${item.id}`}
      />
      {isLoading && <Loading />}
    </SafeAreaView>
  );
};

List.navigationOptions = ({ navigation }) => {
  const userCount = navigation.getParam('userCount', 0);
  return {
    title: `Users ${userCount ? `(${userCount})` : ''}`,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    padding: 10,
  },
  name: {
    fontSize: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
});

export default List;
