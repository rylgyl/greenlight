import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { storePhoto } from './StorageUtility';

const NameEntryScreen = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const { savedPhotoPath } = route.params;

  const handleSubmit = async () => {
    if (name.trim()) {
      await storePhoto(savedPhotoPath, name.trim());
      navigation.navigate('HomeScreen'); // Or wherever you want to go after saving
    } else {
      // Handle empty name input
      alert('Please enter a name');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
