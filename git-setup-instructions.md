# Git Setup Instructions for LawCraft

## Step 1: Install Git (if not done already)
1. Download Git from: https://git-scm.com/download/win
2. Install with default settings
3. Restart VS Code or reload window

## Step 2: Initialize Repository
After Git is installed, run these commands in VS Code terminal:

```bash
# Initialize Git repository
git init

# Configure Git (replace with your info)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files to staging
git add .

# Create initial commit
git commit -m "🎉 Initial commit: LawCraft AI-powered legal document generator"

# Set main branch
git branch -M main
```

## Step 3: Connect to GitHub
1. Create new repository on GitHub (don't initialize with README)
2. Copy the repository URL
3. Run these commands (replace with your URL):

```bash
git remote add origin https://github.com/yourusername/lawcraft.git
git push -u origin main
```

## Alternative: Use GitHub Desktop
If you prefer a GUI:
1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository → Browse to D:\Law-Craft
4. It will initialize Git automatically

## Troubleshooting
- If Git commands don't work, restart VS Code after installing Git
- Make sure Git is added to your system PATH during installation
- You can verify Git installation by running: `git --version`
