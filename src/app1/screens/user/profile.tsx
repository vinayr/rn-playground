import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { useDispatch } from 'react-redux';
import { User } from 'app1/types';
import { deleteUser } from 'app1/store/actions';
import Loading from 'app1/components/loading';

const Profile: NavigationScreenComponent = () => {
  console.log('Profile');
  const user: User = useNavigationParam('user');
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    await dispatch(deleteUser(user.id));
    // setIsLoading(false);
    goBack();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.body}>
      <Text style={styles.text}>{user.id}</Text>
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.text}>{user.phone}</Text>
      <View style={styles.btn}>
        <Button title="Delete" onPress={onDelete} />
      </View>
    </View>
  );
};

Profile.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('user').name,
  };
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  btn: {
    marginTop: 20,
    width: 100,
  },
  text: {
    fontSize: 16,
  },
});

export default Profile;
