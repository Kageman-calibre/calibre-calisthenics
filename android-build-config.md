
# Android Build Configuration for Calibre

## Prerequisites
1. Android Studio installed
2. Android SDK (API 33+)
3. Java JDK 11 or higher

## Keystore Creation
Create a keystore for signing your app:

```bash
keytool -genkey -v -keystore calibre-release-key.keystore -alias calibre -keyalg RSA -keysize 2048 -validity 10000
```

Store this keystore file securely and remember the passwords!

## Build Steps

1. Run the build script:
   ```bash
   chmod +x scripts/build-android.sh
   ./scripts/build-android.sh
   ```

2. In Android Studio:
   - Build > Generate Signed Bundle/APK
   - Select Android App Bundle (AAB)
   - Choose your keystore file
   - Enter keystore and key passwords
   - Select "release" build variant
   - Click "Create"

## App Store Assets Needed

### Icons (all PNG format):
- App Icon: 512x512px
- Adaptive Icon Foreground: 432x432px
- Adaptive Icon Background: 432x432px

### Screenshots:
- Phone: 1080x1920px (portrait) or 1920x1080px (landscape)
- 7-inch Tablet: 1200x1920px (portrait) or 1920x1200px (landscape)
- 10-inch Tablet: 1440x2560px (portrait) or 2560x1440px (landscape)

### Graphics:
- Feature Graphic: 1024x500px
- Promo Video (optional): YouTube link

### Store Listing Info:
- App Title: "Calibre - Calisthenics Training"
- Short Description (80 chars): "Master calisthenics with expert programs and AI guidance"
- Full Description (4000 chars max)
- Privacy Policy URL (required)
- Category: Health & Fitness
- Content Rating: Everyone or Teen (depending on features)

## Google Play Console Setup

1. Create developer account ($25 fee)
2. Create new app
3. Fill app details:
   - App name: Calibre
   - Category: Health & Fitness
   - Tags: fitness, calisthenics, workout, training
4. Upload AAB file
5. Complete all required sections:
   - App content (Content rating, Target audience, etc.)
   - Data safety
   - Privacy policy
   - App access (if using special permissions)

## Testing Strategy

1. Internal Testing: Upload to internal track first
2. Closed Testing: Invite beta testers
3. Open Testing: Public beta (optional)
4. Production: Final release

## Important Notes

- First review can take up to 7 days
- Subsequent updates usually reviewed within 1-2 days
- Keep your keystore file safe - you can't update your app without it
- Test thoroughly on different devices before release
- Monitor Google Play Console for policy violations
