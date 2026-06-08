import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TeachingProvider} from './src/context/TeachingContext';
import {AppNavigator} from './src/navigation/AppNavigator';
import {colors} from './src/theme/colors';

console.log('App mounted');

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <TeachingProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </TeachingProvider>
    </SafeAreaProvider>
  );
}

export default App;
