
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Calibre for Android deployment...\n');

// Check if required files exist
const requiredFiles = [
  'capacitor.config.ts',
  'package.json',
  'src/main.tsx'
];

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Required file missing: ${file}`);
    process.exit(1);
  }
});

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('🏗️  Building web application...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('🔄 Syncing with Capacitor...');
  execSync('npx cap sync android', { stdio: 'inherit' });

  console.log('✅ Build preparation complete!');
  console.log('\n📱 Next steps:');
  console.log('1. Run: npx cap open android');
  console.log('2. In Android Studio: Build > Generate Signed Bundle/APK');
  console.log('3. Choose Android App Bundle (AAB)');
  console.log('4. Sign with your keystore');
  console.log('5. Upload to Google Play Console');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
