import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen'; // Assuming you have a HomeScreen component
import CameraScreen from './components/CameraScreen';
import ConfirmPictureScreen from './components/ConfirmPictureScreen';
import NameEntryScreen from './components/NameEntryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="ConfirmPictureScreen" component={ConfirmPictureScreen} />
        <Stack.Screen name="NameEntryScreen" component={NameEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
