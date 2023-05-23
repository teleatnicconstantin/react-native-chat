import React, { useContext, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ChatContextType, ChatsContext } from '../context/chatsConext';
import { AuthContext, AuthContextType } from '../context/authContext';
import AddPrivateChat from '../components/AddPrivateChat';
import AddGroupChat from '../components/AddGroupChat';
import EmptyList from '../components/EmptyList';
import ChatItem from '../components/ChatItem';
import settings from '../../settings';

export type Props = {};

const Chats: React.FC<Props> = () => {
  const [addChat, setAddChat] = useState<boolean>(false);
  const [addGroupChat, setAddGroupChat] = useState<boolean>(false);
  const [refreshChats, setRefreshChats] = useState<boolean>(false);
  const { auth } = useContext(AuthContext) as AuthContextType;
  const { chats, loading } = useContext(ChatsContext) as ChatContextType;

  const toogleAddChatModal = (): void => {
    setAddChat(!addChat);
  };

  const toogleAddGroupChatModal = (): void => {
    setAddGroupChat(!addGroupChat);
  };

  const refreshChatsHandle = (): void => {
    setRefreshChats(true);
    setTimeout(() => {
      setRefreshChats(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Modal
        testID={'addPrivateChat'}
        isVisible={addChat}
        onBackdropPress={toogleAddChatModal}
        onSwipeComplete={toogleAddChatModal}
        swipeDirection={['down']}
        style={styles.viewModal}>
        <AddPrivateChat closeModal={toogleAddChatModal} />
      </Modal>
      <Modal
        testID={'addGroupChat'}
        isVisible={addGroupChat}
        onBackdropPress={toogleAddGroupChatModal}
        onSwipeComplete={toogleAddGroupChatModal}
        swipeDirection={['down']}
        style={styles.viewModal}>
        <AddGroupChat closeModal={toogleAddGroupChatModal} />
      </Modal>

      <View style={styles.headerContainer}>
        <Image source={{ uri: `${settings.avatarUrl}/${auth.id}.jpg` }} style={styles.headerImage} />
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toogleAddChatModal} style={styles.headerButton}>
            <MaterialIcons name='chat' size={27} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toogleAddGroupChatModal} style={styles.headerButton}>
            <MaterialIcons name='group-add' size={27} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={styles.flatList}
        data={chats}
        ListEmptyComponent={loading ? null : <EmptyList />}
        refreshing={refreshChats || loading}
        onRefresh={refreshChatsHandle}
        renderItem={({ item }) => <ChatItem key={item.id} item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
  },
  headerImage: {
    borderRadius: 30,
    height: 45,
    marginRight: 10,
    width: 45,
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 10,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  viewModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default Chats;
