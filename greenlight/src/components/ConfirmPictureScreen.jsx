import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';

const ConfirmPictureScreen = ({ route, navigation }) => {
  const { photo } = route.params;

  const savePhoto = async () => {
    try {
      const newPath = `${
        RNFS.DocumentDirectoryPath
      }/savedPhoto_${Date.now()}.jpg`;
      await RNFS.copyFile(photo.path, newPath);
      console.log('Photo saved successfully:', newPath);
      navigation.navigate('NameEntryScreen', { savedPhotoPath: newPath });
    } catch (error) {
      console.error('Failed to save photo:', error);
      // Handle the error appropriately
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: `file://${photo.path}` }} style={styles.image} />
      <Button title="Use this photo" onPress={savePhoto} />
      <Button title="Retake" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
  },
});

export default ConfirmPictureScreen;
