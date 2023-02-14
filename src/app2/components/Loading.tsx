import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@src/app2/themes';

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
