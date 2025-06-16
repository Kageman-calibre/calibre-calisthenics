
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.65464b3be42f43d4bbc37e45385459d5',
  appName: 'lean-body-blueprint',
  webDir: 'dist',
  server: {
    url: 'https://65464b3b-e42f-43d4-bbc3-7e45385459d5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e293b',
      showSpinner: false
    }
  }
};

export default config;
