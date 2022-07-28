import React, { FC, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '@/app1/navigation/types';
import { useUserState, fetchUsers, resetAll, getUsers } from './context';
import { User } from './types';

interface ItemProps {
  user: User;
  onPress: (user: User) => void;
}

const Item: FC<ItemProps> = ({ user, onPress }) => {
  console.log('User');
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(user)}>
      <Text style={styles.name}>{user.name}</Text>
    </TouchableOpacity>
  );
};

const UserList = ({ navigation }: RootStackScreenProps<'UserProfile'>) => {
  const { state, dispatch } = useUserState();
  const users = getUsers(state);
  console.log('UserList', users.length);

  useEffect(() => {
    fetchUsers(dispatch);
    return () => {
      resetAll(dispatch);
    };
  }, [dispatch]);

  const onPress = (user: User) => {
    navigation.navigate('UserProfile', { user });
  };

  return (
    <SafeAreaView style={styles.body}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Item user={item} onPress={onPress} />}
        keyExtractor={(item) => `${item.id}`}
      />
    </SafeAreaView>
  );
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

export default UserList;
