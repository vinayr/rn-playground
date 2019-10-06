import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { User } from 'app1/types';
import { selectUsers } from 'app1/store/selectors';
import { deleteUser } from 'app1/store/actions';
import Empty from 'app1/components/empty';

interface ItemProps {
  user: User;
}

const Item = (props: ItemProps) => {
  // console.log('User');
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
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setParams({ userCount: users.length });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.length]);

  if (!users.length) {
    return <Empty text="No Users" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <Item user={item} />}
        keyExtractor={item => `${item.id}`}
      />
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
