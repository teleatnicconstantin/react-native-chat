import React from 'react';
import { StyleSheet, Pressable, Image } from 'react-native';
import { Asset } from '../@types/Message';

export type Props = {
  file: Asset;
};

const PreviewImageItem: React.FC<Props> = ({ file }) => {
  return (
    <Pressable>
      <Image source={{ uri: file.uri }} style={styles.previewImage} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  previewImage: {
    borderRadius: 5,
    height: 75,
    marginRight: 10,
    marginBottom: 10,
    width: 75,
  },
});

export default PreviewImageItem;
