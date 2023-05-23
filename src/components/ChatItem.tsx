import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { RootStackParamList } from '../@types/RootStackParamList';
import { Chat } from '../@types/Chat';
import settings from '../../settings';

export type Props = {
  item: Chat;
};

dayjs.extend(relativeTime);

const ChatItem: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Conversation', { chat: item })}>
      <Image source={{ uri: item.avatar }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          {item.lastMessage && <Text style={styles.subTitle}>{dayjs(item.lastMessage.date).fromNow(true)}</Text>}
        </View>

        {item.lastMessage && (
          <Text numberOfLines={2} style={styles.subTitle}>
            {item.lastMessage.body}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    borderRadius: 30,
    height: 60,
    marginRight: 10,
    width: 60,
  },
  content: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: settings.colors.lightgray,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 17,
  },
  subTitle: {
    color: settings.colors.gray,
  },
});

export default ChatItem;
