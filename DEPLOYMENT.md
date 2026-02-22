# Deployment Instructions for GitHub Pages

## Prerequisites
- Node.js and npm installed
- Git installed
- GitHub account

## Step-by-Step Deployment

### 1. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., "color-palette-app")
3. Don't initialize with README, .gitignore, or license

### 3. Update Configuration Files

**In `package.json`:**
- Replace `YOUR_GITHUB_USERNAME` with your GitHub username
- Replace `YOUR_REPO_NAME` with your repository name

**In `vite.config.js`:**
- Replace `YOUR_REPO_NAME` with your repository name

Example:
- If your GitHub username is `johndoe` and repo is `color-palette-app`
- `homepage`: `https://johndoe.github.io/color-palette-app`
- `base`: `/color-palette-app/`

### 4. Link to GitHub Repository
```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 5. Install Dependencies
```bash
npm install
```

This will install the `gh-pages` package needed for deployment.

### 6. Deploy to GitHub Pages
```bash
npm run deploy
```

This command will:
- Build your app (`npm run build`)
- Deploy the `dist` folder to the `gh-pages` branch
- Push to GitHub

### 7. Configure GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### 8. Access Your App
After a few minutes, your app will be live at:
```
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/
```

## Updating Your Deployment

Whenever you make changes:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main

# Deploy the updated version
npm run deploy
```

## Troubleshooting

### Issue: Blank page after deployment
- Check that `base` in `vite.config.js` matches your repo name
- Check that `homepage` in `package.json` is correct
- Clear browser cache and try again

### Issue: 404 errors for assets
- Ensure `base` path in `vite.config.js` has leading and trailing slashes: `/repo-name/`

### Issue: gh-pages branch not created
- Run `npm run deploy` again
- Check that you have push permissions to the repository

### Issue: Changes not reflecting
- Wait 2-3 minutes for GitHub Pages to rebuild
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check the Actions tab in GitHub to see deployment status

## Local Testing Before Deployment

Test the production build locally:
```bash
npm run build
npm run preview
```

This will show you how the app will look when deployed.

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Notes

- The app uses React 19 and Vite
- All 16.7 million colors are generated on-demand for performance
- 250 curated mood cards are included
- The app is fully responsive and works on all devices
