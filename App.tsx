import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AppNavigation from './components/navigations/app.navigation';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App ()
{
  return (
    <SafeAreaView style={ { flex: 1 } }>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaView>

  );
}

