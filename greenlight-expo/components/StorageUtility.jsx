import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store the profile (photo path, name, and location)
export const storeProfile = async (photoPath, name, location) => {
  try {
    const profile = {
      name,
      photoPath,
      location, // Add location to the profile
    };
    // Save the profile object as a string in AsyncStorage
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    console.log('Profile saved successfully:', profile);
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};

// Function to retrieve the stored profile (photo path, name, and location)
export const getProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('Error retrieving profile:', error);
  }
};

// Function to clear the stored profile (optional)
export const clearProfile = async () => {
  try {
    await AsyncStorage.removeItem('userProfile');
    console.log('Profile cleared successfully');
  } catch (error) {
    console.error('Error clearing profile:', error);
  }
};
