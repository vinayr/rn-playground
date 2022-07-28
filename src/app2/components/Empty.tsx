import React, { FC } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

interface Props {
  text: string;
}

const Empty: FC<Props> = ({ text }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default Empty;
