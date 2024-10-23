import React, { useState} from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { storeProfile } from './StorageUtility';
import { addItem } from '../api';
import * as ImageManipulator from 'expo-image-manipulator';


const NameEntryScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  
  const [newItem, setNewItem] = useState('');
  const { savedPhotoPath } = route.params;
  const [isUploading, setIsUploading] = useState(false);

  const resizeImage = async (uri) => {
    const resizedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // Adjust the width as needed
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return resizedImage.uri;
  };

  const handleAddItem = async () => {
    try {
      console.log('Starting handleAddItem');

      if (name.trim()) {
        console.log('Before addItem API call');

        // Resize the image
        const resizedUri = await resizeImage(savedPhotoPath);

        // Create a FormData object
        const formData = new FormData();
        formData.append('user', name.trim());

        // Append the resized photo
        formData.append('photo', {
          uri: resizedUri,
          name: `photo_${Date.now()}.jpg`,
          type: 'image/jpeg',
        });

        setIsUploading(true); // Start loading

        // Call the addItem API with FormData
        const response = await addItem(formData);
        console.log('API call successful:', response);

        if (response.success) {
          Alert.alert('Success', 'Profile saved successfully!');
          // Optionally, reset the form or navigate to another screen
          setName('');
          navigation.navigate('LocationSelectorScreen');
        } else {
          Alert.alert('Upload Failed', response.message || 'Failed to save profile.');
        }
      } else {
        console.log('Name is empty or invalid');
        Alert.alert('Invalid Input', 'Please enter a valid name.');
      }

      console.log('handleAddItem completed successfully');
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'An error occurred while saving your profile.');
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  const handleSubmit = async () => {
  if (name.trim() && savedPhotoPath) {
    await storeProfile(savedPhotoPath, name.trim()); // Store the profile (photo and name) locally
    await handleAddItem();
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
