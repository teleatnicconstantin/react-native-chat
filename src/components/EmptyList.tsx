import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type Props = {};

const EmptyList: React.FC<Props> = () => {
  return (
    <View style={styles.content}>
      <Text>There is nothing to display!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 22,
  },
});

export default EmptyList;
