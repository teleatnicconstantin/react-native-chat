import React from 'react';
import { StyleSheet, View } from 'react-native';
import PreviewImageItem from './PreviewImageItem';
import { Asset } from '../@types/Message';

export type Props = {
  assets: Asset[];
};

const PreviewFiles: React.FC<Props> = ({ assets }) => {
  return (
    <View style={styles.previewContainer}>
      {assets?.map((file, index) => (
        <PreviewImageItem key={index} file={file} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
});

export default PreviewFiles;
