
#!/bin/bash

echo "🚀 Building Calibre for Android Production..."

# Exit on any error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}Step 2: Building web app...${NC}"
npm run build

echo -e "${YELLOW}Step 3: Syncing with Capacitor...${NC}"
npx cap sync android

echo -e "${YELLOW}Step 4: Opening Android Studio...${NC}"
echo -e "${GREEN}Next steps in Android Studio:${NC}"
echo "1. Build > Generate Signed Bundle/APK"
echo "2. Choose Android App Bundle (AAB)"
echo "3. Create/select your keystore"
echo "4. Build release version"
echo "5. Upload AAB to Google Play Console"

npx cap open android
