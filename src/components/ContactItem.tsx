import React from 'react';
import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
import { User } from '../@types/User';
import settings from '../../settings';

export type Props = {
  item: User;
  onPress: (item: User) => void;
};

const ContactItem: React.FC<Props> = ({ item, onPress }) => {
  const onPressHandle = (): void => {
    onPress(item);
  };

  return (
    <Pressable onPress={onPressHandle} style={styles.container}>
      <Image source={{ uri: `${settings.avatarUrl}/${item.id}.jpg` }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: settings.colors.lightgray,
    flexDirection: 'row',
    height: 60,
    marginHorizontal: 10,
    width: '100%',
  },
  image: {
    borderRadius: 30,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
  },
});

export default ContactItem;
