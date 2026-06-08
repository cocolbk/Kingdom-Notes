import {AppRegistry, Platform} from 'react-native';
import {Capacitor} from '@capacitor/core';
import {SplashScreen} from '@capacitor/splash-screen';
import {StatusBar, Style} from '@capacitor/status-bar';
import App from '../App';
import {name as appName} from '../app.json';

async function initNativeShell() {
  if (!Capacitor.isNativePlatform()) {
    return;
  }
  try {
    await StatusBar.setStyle({style: Style.Light});
    await StatusBar.setBackgroundColor({color: '#1B3A4B'});
    await SplashScreen.hide();
  } catch {
    // Optional during web development.
  }
}

AppRegistry.registerComponent(appName, () => App);

const rootTag = document.getElementById('root');
if (rootTag) {
  void initNativeShell().finally(() => {
    AppRegistry.runApplication(appName, {rootTag});
  });
}

if (Platform.OS === 'web') {
  document.addEventListener('gesturestart', event => event.preventDefault());
}
