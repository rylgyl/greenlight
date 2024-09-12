import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo.png';

const SplashScreen = () => {
  const navigation = useNavigation();

  console.log("Splashscreen loaded");

  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => {
      navigation.replace('HomeScreen'); // Navigate to HomeScreen after 2 seconds
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
