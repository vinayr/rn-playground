import React from 'react';
import { StyleSheet, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';

interface Props {
  onPress: () => void;
}

const Error: React.FC<Props> = ({ onPress }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Error</Text>
      <Button title="Try Again" onPress={onPress} />
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
    paddingBottom: 10,
  },
});

export default Error;
