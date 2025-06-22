
#!/bin/bash

echo "🚀 Deploying Calibre to GitHub Pages..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️  Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Built files are in the 'dist' directory"
    echo ""
    echo "Next steps:"
    echo "1. Commit and push your changes to the main branch"
    echo "2. Enable GitHub Pages in your repository settings"
    echo "3. Set the source to 'GitHub Actions'"
    echo "4. Your site will be available at: https://yourusername.github.io/calibre-fitness/"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
