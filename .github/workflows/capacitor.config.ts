import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.unicontrol.app',
  appName: 'UniControl',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {}
};

export default config;
