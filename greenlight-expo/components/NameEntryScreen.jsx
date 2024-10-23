import React, { useState} from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { storeProfile } from './StorageUtility';
import { addItem } from '../api';


const NameEntryScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  
  const [newItem, setNewItem] = useState('');
  const { savedPhotoPath } = route.params;

  const handleAddItem = async () => {
    const item = 'testTEST';
    try {
      console.log('Starting handleAddItem'); // Log start of function
      if (item.trim()) {
        console.log('Before addItem API call'); // Log before API call
        const response = await addItem({ user: item });
        console.log('API call successful:', response); // Log after API call
      } else {
        console.log('Item is empty or invalid');
      }
      console.log('handleAddItem completed successfully');
    } catch (error) {
      console.error('Error adding item:', error); // Log any caught error
      alert('Failed to add item');
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
