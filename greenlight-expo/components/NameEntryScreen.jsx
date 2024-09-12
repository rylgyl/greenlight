import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { storeProfile } from './StorageUtility';

const NameEntryScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const { savedPhotoPath } = route.params;

  const handleSubmit = async () => {
  if (name.trim() && savedPhotoPath) {
    await storeProfile(savedPhotoPath, name.trim()); // Store the profile (photo and name) locally
    navigation.navigate('LocationSelectorScreen'); // Navigate to HomeScreen after saving
  } else {
    alert('Please enter a name');
  }
};
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `file://${savedPhotoPath}` }}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save Profile" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 390,
    height: 390, // Ensure the image is square
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default NameEntryScreen;
