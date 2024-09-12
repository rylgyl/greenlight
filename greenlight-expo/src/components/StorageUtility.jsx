import AsyncStorage from '@react-native-async-storage/async-storage';

const PHOTOS_KEY = 'USER_PHOTOS';

export const storePhoto = async (photoPath, userName) => {
  try {
    const existingPhotosJSON = await AsyncStorage.getItem(PHOTOS_KEY);
    const existingPhotos = existingPhotosJSON
      ? JSON.parse(existingPhotosJSON)
      : [];

    const newPhoto = {
      path: photoPath,
      userName: userName,
      timestamp: new Date().toISOString(),
    };

    const updatedPhotos = [...existingPhotos, newPhoto];
    await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(updatedPhotos));

    console.log('Photo stored successfully');
  } catch (error) {
    console.error('Error storing photo:', error);
  }
};

export const getStoredPhotos = async () => {
  try {
    const photosJSON = await AsyncStorage.getItem(PHOTOS_KEY);
    return photosJSON ? JSON.parse(photosJSON) : [];
  } catch (error) {
    console.error('Error retrieving photos:', error);
    return [];
  }
};
