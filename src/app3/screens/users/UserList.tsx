import React, { memo, useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RootStackScreenProps } from '@src/app3/navigation/types';
import Empty from '@src/app3/components/Empty';
import Loading from '@src/app3/components/Loading';
import { User } from './types';
import * as api from './api';

interface ItemProps {
  user: User;
  onDelete: (id: string) => void;
}

const Item = memo(({ user, onDelete }: ItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const onSelect = () => {
    setIsSelected(!isSelected);
  };

  const _onDelete = () => {
    onDelete(user.id);
  };

  // console.log('User');
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={onSelect}>
        <Text style={styles.name}>{user.name}</Text>
      </TouchableOpacity>
      {isSelected && (
        <View style={styles.details}>
          <Text>{user.email + '\n' + user.phone}</Text>
          <TouchableOpacity onPress={_onDelete}>
            <Text>delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

const UserList = ({ navigation }: RootStackScreenProps<'UserList'>) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(['users'], api.fetchUsers);

  const mutation = useMutation({
    mutationFn: api.deleteUser,
    onMutate: async (id: string) => {
      // optimistically remove the to-be-deleted user from the list
      await queryClient.cancelQueries(['users']);
      const users = queryClient.getQueryData<User[]>(['users']);
      if (!users) {
        return;
      }
      // remove the user from the cache so it immediately disappears from the UI
      queryClient.setQueryData(
        ['users'],
        users.filter((user) => user.id !== id)
      );
    },
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const onDelete = (id: string) => {
    mutation.mutate(id);
  };

  const userCount = data?.length || 0;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `Users (${userCount})` });
  }, [navigation, userCount]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Empty text="Something went wrong" />;
  }

  if (!userCount) {
    return <Empty text="No Users" />;
  }

  console.log('UserList', userCount);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item user={item} onDelete={onDelete} />}
        keyExtractor={(item) => item.id}
        //
      />
    </SafeAreaView>
  );
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

export default UserList;
