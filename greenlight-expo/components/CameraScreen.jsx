import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { manipulateAsync, FlipType } from 'expo-image-manipulator';

const CameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('front');

  if (!permission) {
    return <View><Text>Loading permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to use the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    const options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync(options);
        console.log(photo);
        photo = await manipulateAsync(photo.uri,[
          { rotate: 180 },
          { flip: FlipType.Vertical },
        ]);
        navigation.navigate('ConfirmPictureScreen', { photo });
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      </View>
      <Button title="Capture" onPress={takePhoto} style={styles.captureButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: 390,
    height: 390,
    marginBottom: 20, // Add space between the camera and the button
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    marginTop: 20, // Ensure the button stays below the camera view
  },
});

export default CameraScreen;
