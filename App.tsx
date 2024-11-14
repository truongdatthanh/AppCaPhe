import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DetailScreen from './screens/DetailScreen';
import AppNavigation from './components/navigations/app.navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';


export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>


    /* SafeAfreaView dung de chia lai layout giua body va status bar cua thiet bi*/
    // <NavigationContainer  >
    //   <AppNavigation />
    //   </NavigationContainer >

  );
}
