import React from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';

const ConfirmPictureScreen = ({ route, navigation }) => {
  const { photo } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: `file://${photo.path}` }} style={styles.image} />
      <Button
        title="Use this photo"
        onPress={() => navigation.navigate('NameEntryScreen')}
      />
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
