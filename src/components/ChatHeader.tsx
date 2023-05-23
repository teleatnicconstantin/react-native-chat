import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export type Props = {
  name: string;
  avatar: string;
};

const ChatHeader: React.FC<Props> = ({ name, avatar }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.image} />
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    width: '100%',
  },
  image: {
    width: 44,
    height: 44,
    top: -7,
    left: -15,
    borderRadius: 30,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 17,
  },
});

export default ChatHeader;
