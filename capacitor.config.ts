import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kingdomnotes.app',
  appName: 'Kingdom Notes',
  webDir: 'dist',
  android: {
    path: 'android-cap',
    allowMixedContent: false,
    backgroundColor: '#F7F4EF',
  },
  server: {
    androidScheme: 'https',
  },
};

export default config;
