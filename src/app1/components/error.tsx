import React from 'react';
import { StyleSheet, SafeAreaView, Text, Button } from 'react-native';

interface Props {
  onPress: () => void;
}

const Error: React.FC<Props> = ({ onPress }) => {
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.text}>Error</Text>
      <Button title="Try Again" onPress={onPress} />
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
    paddingBottom: 10,
  },
});

export default Error;
