import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import { User } from 'app2/types';
import { useUserState, fetchUsers, resetAll, getUsers } from 'app2/contexts/user';

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

const List = () => {
  const { state, dispatch } = useUserState();
  const users = getUsers(state);
  console.log('UserList', users.length);

  useEffect(() => {
    fetchUsers(dispatch);
    return () => {
      resetAll(dispatch);
    };
  }, [dispatch]);

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

export default List;
