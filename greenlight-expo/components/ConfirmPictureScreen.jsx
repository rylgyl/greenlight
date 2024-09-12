import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const ConfirmPictureScreen = ({ route, navigation }) => {
  const { photo } = route.params;
  const pictureSize = 390;

  const savePhoto = async () => {
    try {
      const newPath = `${FileSystem.documentDirectory}savedPhoto_${Date.now()}.jpg`;
      await FileSystem.moveAsync({
        from: photo.uri,
        to: newPath,
      });
      console.log('Photo saved successfully:', newPath);
      navigation.navigate('NameEntryScreen', { savedPhotoPath: newPath });
    } catch (error) {
      console.error('Failed to save photo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: pictureSize, height: pictureSize }}>
        <Image source={{ uri: photo.uri }} style={styles.image} />
        <Button title="Use this photo" onPress={savePhoto} />
        <Button title="Retake" onPress={() => navigation.goBack()} />
      </View>
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
    height: '100%',
  },
});

export default ConfirmPictureScreen;
