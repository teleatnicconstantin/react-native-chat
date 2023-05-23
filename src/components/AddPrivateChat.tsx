import React, { useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChatContextType, ChatsContext } from '../context/chatsConext';
import { AuthContext, AuthContextType } from '../context/authContext';
import { UsersContext, UsersContextType } from '../context/usersContext';
import { RootStackParamList } from '../@types/RootStackParamList';
import { User } from '../@types/User';
import { Chat } from '../@types/Chat';
import ContactItem from './ContactItem';
import settings from '../../settings';

export type Props = {
  closeModal: () => void;
};

const AddPrivateChat: React.FC<Props> = ({ closeModal }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { auth } = useContext(AuthContext) as AuthContextType;
  const { users } = useContext(UsersContext) as UsersContextType;
  const { addNewChat, chats } = useContext(ChatsContext) as ChatContextType;

  const onAddChatHandle = (chatUser: User): void => {
    const existChat = chats.find(
      item =>
        item.type === 'private' &&
        item.participants.find(participant => participant.id === auth.id) &&
        item.participants.find(participant => participant.id === chatUser.id),
    );

    if (existChat) {
      navigation.navigate('Conversation', { chat: existChat });

      closeModal();
    } else {
      const chatData: Chat = {
        id: chats.length + 1,
        type: 'private',
        author: auth,
        name: chatUser.name,
        avatar: `${settings.avatarUrl}/${chatUser?.id}.jpg`,
        participants: [auth, chatUser],
      };

      addNewChat(chatData).then(data => {
        navigation.navigate('Conversation', { chat: data });

        closeModal();
      });
    }
  };

  return (
    <View style={styles.content}>
      <FlatList
        style={styles.flatList}
        data={users}
        renderItem={({ item }) => <ContactItem key={item.id} item={item} onPress={onAddChatHandle} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    backgroundColor: settings.colors.white,
    borderRadius: 8,
    height: '70%',
    justifyContent: 'center',
    padding: 22,
    width: '100%',
  },
});

export default AddPrivateChat;
