# LawCraft Git Repository Setup Script
# Run this script in PowerShell to initialize your Git repository

Write-Host "🚀 Setting up LawCraft Git Repository..." -ForegroundColor Green

# Check if Git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Initialize Git repository
Write-Host "📁 Initializing Git repository..." -ForegroundColor Cyan
git init

# Check if .git folder was created
if (Test-Path ".git") {
    Write-Host "✅ Git repository initialized successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to initialize Git repository" -ForegroundColor Red
    exit 1
}

# Configure Git user (if not already configured globally)
$gitUser = git config --global user.name
$gitEmail = git config --global user.email

if (-not $gitUser) {
    $userName = Read-Host "Enter your GitHub username"
    git config --global user.name "$userName"
    Write-Host "✅ Git username configured: $userName" -ForegroundColor Green
}

if (-not $gitEmail) {
    $userEmail = Read-Host "Enter your GitHub email"
    git config --global user.email "$userEmail"
    Write-Host "✅ Git email configured: $userEmail" -ForegroundColor Green
}

# Add all files to staging
Write-Host "📋 Adding files to Git..." -ForegroundColor Cyan
git add .

# Show status
Write-Host "📊 Git Status:" -ForegroundColor Cyan
git status --short

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Cyan
git commit -m "🎉 Initial commit: LawCraft AI-powered legal document generator

- React + TypeScript frontend with Vite
- Supabase authentication and database
- Chakra UI design system
- Document generation features
- Responsive design with animations
- CI/CD pipeline ready"

Write-Host "✅ Initial commit created successfully!" -ForegroundColor Green

# Instructions for GitHub
Write-Host "`n🔗 Next Steps for GitHub:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Create a new repository named 'lawcraft' (or your preferred name)" -ForegroundColor White
Write-Host "3. Do NOT initialize with README, .gitignore, or license" -ForegroundColor White
Write-Host "4. Copy the repository URL" -ForegroundColor White
Write-Host "5. Run these commands:" -ForegroundColor White
Write-Host ""
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/yourusername/lawcraft.git" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "Replace 'yourusername/lawcraft' with your actual GitHub username and repo name" -ForegroundColor Gray

Write-Host "`n🎉 Your LawCraft project is ready for GitHub!" -ForegroundColor Green
Write-Host "📚 Check README.md for detailed setup instructions" -ForegroundColor Blue
