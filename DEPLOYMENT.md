# 🚀 LawCraft Deployment Guide

## Quick Deployment Options

### 1. 🌐 Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: lawcraft
# - Directory: ./
# - Override settings? No
```

### 2. 📦 Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### 3. 🐙 GitHub Pages
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: GitHub Actions
4. The CI/CD pipeline will automatically deploy on every push

### 4. 🚀 Manual Hosting
```bash
# Build for production
npm run build

# Upload the 'dist' folder to any static hosting service:
# - Hostinger
# - 000webhost
# - Firebase Hosting
# - AWS S3
# - Digital Ocean
```

## Environment Variables

Before deploying, make sure to set up these environment variables in your hosting platform:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Platform-specific instructions:

**Vercel:**
- Add environment variables in Vercel dashboard
- Project Settings → Environment Variables

**Netlify:**
- Site Settings → Environment Variables

**GitHub Pages:**
- Repository Settings → Secrets and Variables → Actions

## 🔧 Production Checklist

- [ ] Environment variables configured
- [ ] Supabase project set up
- [ ] Authentication policies configured
- [ ] Build runs successfully (`npm run build`)
- [ ] All routes working correctly
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)

## 🌍 Live Demo
Your app will be available at:
- Vercel: `https://lawcraft-yourname.vercel.app`
- Netlify: `https://lawcraft-yourname.netlify.app`
- GitHub Pages: `https://yourusername.github.io/lawcraft`

## 📊 Performance Optimization

The current build size is ~720KB. For optimization:
- Consider code splitting for large components
- Lazy load routes
- Optimize images in `/public` folder
- Enable gzip compression on your hosting platform

## 🆘 Troubleshooting

**Build fails?**
- Check all imports are correct
- Ensure all environment variables are set
- Run `npm run lint` to check for errors

**Authentication not working?**
- Verify Supabase URL and keys
- Check Supabase dashboard for authentication settings
- Ensure redirect URLs are configured correctly

**Pages not loading?**
- Configure your hosting platform for SPA routing
- Add `_redirects` file for Netlify or `vercel.json` for Vercel
