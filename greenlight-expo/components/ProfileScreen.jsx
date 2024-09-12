import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getProfile } from './StorageUtility'; // Import the getProfile function

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await getProfile(); // Retrieve the profile data
      if (storedProfile) {
        setProfile(storedProfile);
      }
    };
    loadProfile();
  }, []);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: `file://${profile.photoPath}` }} style={styles.image} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.location}>Location: {profile.location?.name || 'Location not set'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ProfileScreen;
