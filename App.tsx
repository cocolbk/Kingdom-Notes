import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TeachingProvider} from './src/context/TeachingContext';
import {AppNavigator} from './src/navigation/AppNavigator';
import {colors} from './src/theme/colors';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <TeachingProvider>
        <AppNavigator />
      </TeachingProvider>
    </SafeAreaProvider>
  );
}

export default App;
