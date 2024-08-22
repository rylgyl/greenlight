import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.front; // Use 'back' for the rear camera

  useEffect(() => {
    const requestCameraPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      setHasPermission(
        cameraPermission === 'authorized' &&
          microphonePermission === 'authorized',
      );
    };

    requestCameraPermission();
  }, []);

  if (device == null) return <Text>Loading...</Text>;
  if (!hasPermission) return <Text>No access to camera</Text>;

  const capturePhoto = async () => {
    if (device) {
      const photo = await device.takePhoto();
      console.log(photo); // Handle the captured photo
      // Navigate to the next screen with the captured photo
      navigation.navigate('ConfirmPictureScreen', { photo });
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <Button title="Capture" onPress={() => capturePhoto()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
