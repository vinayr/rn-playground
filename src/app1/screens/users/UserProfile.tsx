import React, { useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button } from 'react-native';
import { RootStackScreenProps } from '@/app1/navigation/types';
import { useUserState, deleteUser } from './context';

const UserProfile = ({ navigation, route }: RootStackScreenProps<'UserProfile'>) => {
  console.log('Profile');
  const { user } = route.params;
  const { dispatch } = useUserState();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: user.name });
  }, [navigation, user.name]);

  const onDelete = async () => {
    await deleteUser(dispatch, user.id);
    navigation.goBack();
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

export default UserProfile;
