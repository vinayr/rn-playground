import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

interface Props {
  text: string;
}

const Empty: React.FC<Props> = ({ text }) => {
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.text}>{text}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default Empty;
