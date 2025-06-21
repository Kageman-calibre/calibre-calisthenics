
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.calibre.fitness',
  appName: 'Calibre',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      backgroundColor: '#000000',
      style: 'LIGHT'
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#D4AF37",
      sound: "beep.wav"
    },
    Camera: {
      permissions: {
        camera: "För att ta framstegsfoton och analysera form"
      }
    },
    Geolocation: {
      permissions: {
        location: "För att hitta närliggande gym och utomhusträning"
      }
    }
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: 'AAB'
    },
    permissions: [
      "android.permission.CAMERA",
      "android.permission.ACCESS_FINE_LOCATION",
      "android.permission.ACCESS_COARSE_LOCATION", 
      "android.permission.RECORD_AUDIO",
      "android.permission.VIBRATE",
      "android.permission.WAKE_LOCK",
      "android.permission.INTERNET",
      "android.permission.ACCESS_NETWORK_STATE"
    ]
  }
};

export default config;
