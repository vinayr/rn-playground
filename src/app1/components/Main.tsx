import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { IStoreState, IUser } from '../interfaces';
import { selectUsers } from '../selectors';
import { getUsers, clearAll } from '../actions';

interface IProps {
  users: IUser[];
}

const Main: React.FC<IProps> = ({ users }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    return () => {
      dispatch(clearAll());
    };
  }, [dispatch]);

  console.log('MAIN');
  return (
    <View style={styles.body}>
      <Text>Total Users: {users.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect((state: IStoreState) => ({
  users: selectUsers(state),
}))(Main);
