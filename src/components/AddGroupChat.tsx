import React, { useContext, useState } from 'react';
import { StyleSheet, FlatList, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
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

const AddGroupChat: React.FC<Props> = ({ closeModal }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const { auth } = useContext(AuthContext) as AuthContextType;
  const { users } = useContext(UsersContext) as UsersContextType;
  const { addNewChat, chats } = useContext(ChatsContext) as ChatContextType;

  const onChangeCheckboxHandle = (chatUser: User): void => {
    if (selectedUsers.find(user => user.id === chatUser.id)) {
      setSelectedUsers(selectedUsers.filter(user => user.id !== chatUser.id));
    } else {
      setSelectedUsers([...selectedUsers, chatUser]);
    }
  };

  const onAddChatHandle = (): void => {
    const chatData: Chat = {
      id: chats.length + 1,
      type: 'group',
      name: name,
      avatar: settings.avatarGroupUrl,
      author: auth,
      participants: [auth, ...selectedUsers],
    };

    addNewChat(chatData).then(data => {
      closeModal();

      setName('');

      navigation.navigate('Conversation', { chat: data });
    });
  };

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <TextInput value={name} onChangeText={setName} style={styles.input} placeholder='Type your group name...' />
        <Button
          title='Create'
          color={settings.mainColor}
          disabled={name === '' || selectedUsers.length === 0}
          onPress={onAddChatHandle}
        />
      </View>
      <FlatList
        style={styles.flatList}
        data={users}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.contactItemContainer}>
            <CheckBox
              value={selectedUsers.find(user => user.id === item.id) ? true : false}
              onValueChange={() => onChangeCheckboxHandle(item)}
            />
            <ContactItem item={item} onPress={onChangeCheckboxHandle} />
          </View>
        )}
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
    height: '75%',
    justifyContent: 'center',
    padding: 22,
    width: '100%',
  },
  input: {
    backgroundColor: settings.colors.white,
    borderColor: settings.colors.lightgray,
    borderWidth: StyleSheet.hairlineWidth,
    height: 45,
    flex: 1,
    marginRight: 15,
    padding: 5,
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: settings.colors.lightgray,
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15,
    width: '100%',
  },
  contactItemContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
});

export default AddGroupChat;
