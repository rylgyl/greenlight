// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';

// const CameraScreen = ({ navigation }) => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const devices = useCameraDevices();
//   const device = devices.front; // Use 'back' for the rear camera

//   useEffect(() => {
//     const requestCameraPermission = async () => {
//       const cameraPermission = await Camera.requestCameraPermission();
//       const microphonePermission = await Camera.requestMicrophonePermission();
//       setHasPermission(
//         cameraPermission === 'authorized' &&
//           microphonePermission === 'authorized',
//       );
//     };

//     requestCameraPermission();
//   }, []);

//   if (device == null) return <Text>Loading...</Text>;
//   if (!hasPermission) return <Text>No access to camera</Text>;

//   const capturePhoto = async () => {
//     if (device) {
//       const photo = await device.takePhoto();
//       console.log(photo); // Handle the captured photo
//       // Navigate to the next screen with the captured photo
//       navigation.navigate('ConfirmPictureScreen', { photo });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         photo={true}
//       />
//       <Button title="Capture" onPress={() => capturePhoto()} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CameraScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [device, setDevice] = useState(null);
  const devices = useCameraDevices();

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

  // Define the capturePhoto function before using it in the component
  const capturePhoto = async () => {
    try {
      if (!device) {
        throw new Error('Camera device not found.');
      }

      // Add a check to ensure the camera is ready
      if (device.isActive) {
        const photo = await device.current.takePhoto();
        console.log(photo); // Handle the captured photo
        navigation.navigate('ConfirmPictureScreen', { photo });
      } else {
        throw new Error('Camera is not active.');
      }
    } catch (error) {
      console.error('Failed to take photo:', error.message);
      alert('An error occurred while taking the photo: ' + error.message);
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
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <Button title="Capture" onPress={capturePhoto} />
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
