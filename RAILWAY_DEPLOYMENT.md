# Railway Deployment Guide for Pathways Backend

## ✅ Completed: MongoDB Setup
- **Cluster**: Pathway
- **Region**: Iowa (us-central1)
- **Database User**: dinaelahi_do_user
- **Connection String**: `mongodb+srv://dinaelahi_do_user:d4VhLoG9R4c8JohS@pathway.6a3bzu2pj.mongodb.net/?appName=Pathway`

## Step 1: Deploy Backend to Railway

### 1.1 Create Railway Account & Authorize GitHub
1. Go to https://railway.app
2. Click "Deploy"
3. Click "GitHub Repository"
4. Click "Continue with GitHub"
5. **Authorize Railway App** - Click the green "Authorize" button on GitHub
6. Select **DinaElAhl/Pathways-** repository
7. Railway will auto-detect your backend code and create a deployment

### 1.2 Add Environment Variables to Railway
After connecting your repository, go to Railway Dashboard → Variables and add:

```
MONGODB_URI=mongodb+srv://dinaelahi_do_user:d4VhLoG9R4c8JohS@pathway.6a3bzu2pj.mongodb.net/?appName=Pathway
JWT_SECRET=pathways-secret-key-change-this-to-something-long-and-random-in-production
PORT=3000
NODE_ENV=production
```

### 1.3 Get Your Railway Backend URL
- After deployment completes, Railway will show you a public URL
- Example: `https://pathways-api-production.railway.app`
- **Save this URL** - you'll need it for the frontend

---

## Step 2: Update Frontend Environment Variables

### 2.1 Update .env.production in your repository
1. Navigate to the `.env.production` file in your repository
2. Update with your Railway backend URL:
```
VITE_API_URL=https://pathways-api-production.railway.app
```

### 2.2 Commit and Push to GitHub
```bash
git add .env.production
git commit -m "Update API URL for Railway backend deployment"
git push origin main
```

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Vercel Auto-Deployment
- Vercel is already connected to your GitHub
- Once you push the updated .env.production file, Vercel will auto-deploy
- Check your deployment at: https://pathways-learn-gamma.vercel.app

### 3.2 Verify Deployment
1. Open https://pathways-learn-gamma.vercel.app
2. Try logging in or creating an account
3. If successful, your platform is LIVE! 🎉

---

## Troubleshooting

### Railway Deployment Issues
- Check Railway logs: Dashboard → Logs tab
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Verify VITE_API_URL matches your Railway URL exactly

---

## Production Checklist
- [ ] MongoDB cluster is running and accessible
- [ ] Railway backend is deployed and public URL is working
- [ ] Environment variables are set in Railway
- [ ] Frontend .env.production is updated with Railway URL
- [ ] Vercel deployment is complete
- [ ] Frontend can successfully call backend API
- [ ] User registration and login work
- [ ] Learning paths load correctly
