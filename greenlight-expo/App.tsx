// import React from 'react';
// import { enableScreens } from 'react-native-screens';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import SplashScreen from './src/components/SplashScreen';
// import HomeScreen from './src/components/HomeScreen';
// import CameraScreen from './src/components/CameraScreen';
// import ConfirmPictureScreen from './src/components/ConfirmPictureScreen';
// import NameEntryScreen from './src/components/NameEntryScreen';

// enableScreens();

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SplashScreen">
//         <Stack.Screen
//           name="SplashScreen"
//           component={SplashScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{ title: 'Welcome' }}
//         />
//         <Stack.Screen
//           name="CameraScreen"
//           component={CameraScreen}
//           options={{ title: 'Take a Picture' }}
//         />
//         <Stack.Screen
//           name="ConfirmPictureScreen"
//           component={ConfirmPictureScreen}
//           options={{ title: 'Confirm Photo' }}
//         />
//         <Stack.Screen
//           name="NameEntryScreen"
//           component={NameEntryScreen}
//           options={{ title: 'Confirm Photo' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/components/SplashScreen';

const Stack = createNativeStackNavigator();

console.log("App loaded");

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
