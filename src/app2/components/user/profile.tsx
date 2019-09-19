import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import { User } from 'app2/types';
import { useUserState, deleteUser } from 'app2/contexts/user';

const Profile: NavigationScreenComponent = () => {
  console.log('Profile');
  const user: User = useNavigationParam('user');
  const { goBack } = useNavigation();
  const { dispatch } = useUserState();

  const onDelete = async () => {
    await deleteUser(dispatch, user.id);
    goBack();
  };

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.text}>{user.id}</Text>
      <Text style={styles.text}>{user.name}</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.text}>{user.phone}</Text>
      <View style={styles.btn}>
        <Button title="Delete" onPress={onDelete} />
      </View>
    </SafeAreaView>
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
