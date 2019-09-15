import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native';
import { NavigationScreenComponent, NavigationScreenProps } from 'react-navigation';
import { useNavigation } from 'react-navigation-hooks';
import { connect, useDispatch } from 'react-redux';
import { AppState, User } from '../../types';
import { selectUsers } from '../../selectors';
import { getUsers, resetAll } from '../../actions';

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

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(resetAll());
    };
  }, [dispatch]);

  if (!users.length) {
    return null;
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
