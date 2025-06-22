
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
    echo "🚀 Next steps to deploy:"
    echo "1. Connect your project to GitHub (if not already done)"
    echo "2. Commit and push all changes to the main branch:"
    echo "   git add ."
    echo "   git commit -m 'Setup GitHub Pages deployment'"
    echo "   git push origin main"
    echo ""
    echo "3. Enable GitHub Pages in your repository settings:"
    echo "   - Go to Settings > Pages"
    echo "   - Set Source to 'GitHub Actions'"
    echo "   - The workflow will automatically deploy your site"
    echo ""
    echo "4. Your site will be available at:"
    echo "   https://[your-username].github.io/calibre-fitness/"
    echo ""
    echo "✨ The GitHub Actions workflow is already configured!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
