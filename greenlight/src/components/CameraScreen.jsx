import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [device, setDevice] = useState(null);
  const devices = useCameraDevices();
  const cameraRef = useRef(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      console.log('Camera Permission:', cameraPermission);
      setHasPermission(
        cameraPermission === 'granted' && microphonePermission === 'granted',
      );
    };

    requestCameraPermission();
  }, []);

  useEffect(() => {
    if (devices) {
      const frontCamera = devices.find(device => device.position === 'front');
      setDevice(frontCamera);
    }
  }, [devices]);

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto();
        console.log(photo);
        navigation.navigate('ConfirmPictureScreen', { photo });
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  if (device == null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <Button title="Capture (Center around button)" onPress={takePhoto} />
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
