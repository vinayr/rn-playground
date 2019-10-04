import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Colors } from 'app1/styles';

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.ORANGE} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    paddingTop: 50,
  },
});

export default Loading;
