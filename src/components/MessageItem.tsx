import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PreviewImageItem from './PreviewImageItem';
import { AuthContext, AuthContextType } from '../context/authContext';
import { Message } from '../@types/Message';
import settings from '../../settings';

export type Props = {
  item: Message;
};

dayjs.extend(relativeTime);

const MessageItem: React.FC<Props> = ({ item }) => {
  const { auth } = useContext(AuthContext) as AuthContextType;
  const isMe = item.author.id === auth.id;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? settings.colors.green : settings.colors.white,
          alignSelf: isMe ? 'flex-end' : 'flex-start',
        },
      ]}>
      <View style={styles.messageContent}>
        {!isMe && <Image source={{ uri: `${settings.avatarUrl}/${item.author.id}.jpg` }} style={styles.image} />}
        <View style={{ flex: 5 }}>
          {!isMe && <Text style={styles.userName}>{item.author.name}</Text>}
          <Text>{item.body}</Text>

          <View style={styles.previewContainer}>
            {item.assets?.map((file, index) => (
              <PreviewImageItem key={index} file={file} />
            ))}
          </View>

          <Text style={styles.time}>{dayjs(item.date).fromNow(true)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContent: {
    flexDirection: 'row',
    width: '100%',
  },
  container: {
    borderRadius: 10,
    margin: 5,
    maxWidth: '80%',
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  time: {
    alignSelf: 'flex-end',
    color: settings.colors.gray,
  },
  userName: {
    fontWeight: '700',
  },
  image: {
    borderRadius: 30,
    height: 40,
    marginRight: 10,
    width: 40,
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
});

export default MessageItem;
