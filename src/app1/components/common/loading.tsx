import React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView style={styles.body}>
      <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
