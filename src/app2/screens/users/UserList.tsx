import React, { memo, useMemo, useState, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { RootStackScreenProps } from '@/app2/navigation/types';
import { useAppDispatch, useAppSelector } from '@/app2/app/store';
import { userActions, userSelectors } from '@/app2/screens/users/redux';
import Empty from '@/app2/components/Empty';

interface ItemProps {
  userId: string;
}

const Item = memo(({ userId }: ItemProps) => {
  const dispatch = useAppDispatch();

  const selectUser = useMemo(() => userSelectors.makeSelectUser(), []);
  const user = useAppSelector(selectUser(userId));

  const [isSelected, setIsSelected] = useState(false);

  const onSelect = () => {
    setIsSelected(!isSelected);
  };

  const onDelete = () => {
    dispatch(userActions.deleteUser(user.id));
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
          <TouchableOpacity onPress={onDelete}>
            <Text>delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});

const UserList = ({ navigation }: RootStackScreenProps<'UserList'>) => {
  const userIds = useAppSelector(userSelectors.userIds);
  const userCount = userIds?.length || 0;
  console.log('UserList', userIds.length);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `Users (${userCount})` });
  }, [navigation, userCount]);

  if (!userIds.length) {
    return <Empty text="No Users" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userIds}
        renderItem={({ item }) => <Item userId={item} />}
        keyExtractor={(item) => item}
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
