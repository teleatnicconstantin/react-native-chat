import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, Pressable, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import * as ImagePicker from 'react-native-image-picker';
import { ImageLibraryOptions } from 'react-native-image-picker';
import { MessagesContext, MessagesContextType } from '../context/conversationConext';
import { AuthContext, AuthContextType } from '../context/authContext';
import PreviewImageItem from './PreviewImageItem';
import { Asset, Message } from '../@types/Message';
import { Chat } from '../@types/Chat';
import settings from '../../settings';

export type Props = {
  chat: Chat;
  scrollToBottom: () => void;
};

const libraryOptions: ImageLibraryOptions = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
  includeExtra: true,
};

const MessageForm: React.FC<Props> = ({ chat, scrollToBottom }) => {
  const [text, setText] = useState<string>('');
  const [files, setFiles] = useState<Asset[]>([]);
  const { auth } = useContext(AuthContext) as AuthContextType;
  const { addNewMessage, messages } = useContext(MessagesContext) as MessagesContextType;

  const onSendHandle = (): void => {
    if (!text) {
      return;
    }

    const message: Message = {
      id: messages.length + 1,
      body: text,
      author: auth,
      date: dayjs().format(),
      assets: files,
    };

    addNewMessage(message, chat).then(() => {
      setText('');
      setFiles([]);
      scrollToBottom();
    });
  };

  const onAttachFile = (): void => {
    ImagePicker.launchImageLibrary(libraryOptions, response => {
      if (response.assets) {
        setFiles([...files, ...response.assets.map(item => ({ name: item.fileName, uri: item.uri }))]);
      }
    });
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.previewContainer}>
        {files.map((file, index) => (
          <PreviewImageItem key={index} file={file} />
        ))}
      </View>
      <View style={styles.form}>
        <TouchableOpacity onPress={onAttachFile}>
          <MaterialIcons name='attach-file' size={16} />
        </TouchableOpacity>

        <TextInput value={text} onChangeText={setText} style={styles.input} placeholder='Type your message...' />

        <Pressable onPress={onSendHandle}>
          <MaterialIcons style={styles.send} name='send' size={16} color={settings.colors.white} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  container: {
    backgroundColor: settings.colors.white,
    borderTopWidth: 1,
    borderColor: settings.colors.lightgray,
    padding: 5,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: settings.colors.white,
    borderRadius: 50,
    borderColor: settings.colors.lightgray,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
    paddingHorizontal: 10,
  },
  send: {
    borderRadius: 15,
    backgroundColor: settings.mainColor,
    overflow: 'hidden',
    padding: 7,
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default MessageForm;
