import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.prince.biblicaljournal',
  appName: 'Biblical Journal',
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
