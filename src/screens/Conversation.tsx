import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View, ImageBackground } from 'react-native';
import { MessagesContext, MessagesContextType } from '../context/conversationConext';
import { ChatsContext, ChatContextType } from '../context/chatsConext';
import MessageForm from '../components/MessageForm';
import { Chat } from '../@types/Chat';
import MessageItem from '../components/MessageItem';
import settings from '../../settings';

export type Props = {
  route: any;
};

const Conversation: React.FC<Props> = props => {
  const chat = props.route.params.chat as Chat;
  const flatListRef = useRef<any>();
  const { updateLastMessage } = useContext(ChatsContext) as ChatContextType;
  const { messages, loading, getMessages, resetListOfMessages } = useContext(MessagesContext) as MessagesContextType;

  useEffect(() => {
    getMessages(chat);

    return () => {
      resetListOfMessages();
    };
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage && lastMessage.id !== chat.lastMessage?.id) {
      updateLastMessage(chat, lastMessage);
    }
  }, [messages]);

  const scrollToBottom = (): void => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  const refreshMessagesHandle = (): void => {
    getMessages(chat);
  };

  return (
    <ImageBackground style={styles.backgroundImage} source={{ uri: settings.chatBackgroundImage }}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          inverted
          style={styles.flatList}
          data={messages}
          refreshing={loading}
          onRefresh={refreshMessagesHandle}
          renderItem={({ item }) => <MessageItem key={item.id} item={item} />}
        />
        <MessageForm chat={chat} scrollToBottom={scrollToBottom} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  flatList: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Conversation;
