import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-navigation';

interface Props {
  text: string;
}

const Empty: React.FC<Props> = ({ text }) => {
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
