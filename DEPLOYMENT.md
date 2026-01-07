# Deployment Guide

## Step 1: Deploy Backend to Railway

1. **Go to Railway**: https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. **Select your repository**
4. **Configure**:
   - Root Directory: `server`
   - Start Command: `node server.js`
   
5. **Add Environment Variables**:
   ```
   PORT=3001
   MONGO_URI=mongodb+srv://daryna2003tk_db_user:a9dgl60Sm04DG8FT@contactlist.ltevngr.mongodb.net/ContactList?retryWrites=true&w=majority&appName=ContactList
   JWT_SECRET=supersecretjwt
   ```

6. **Deploy** and wait for completion

7. **Copy Railway URL**: 
   - Go to Settings → Domains
   - Copy the generated URL (e.g., `https://contacts-production-xxxx.up.railway.app`)

## Step 2: Update Vercel Environment Variable

### Option A: Via Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Select your project (ID: `prj_6psWoYxUp1A7oP8m9zx5zwZ5tjSC`)
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-url.railway.app` (paste Railway URL)
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**
6. Go to **Deployments** → Click **...** → **Redeploy**

### Option B: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add environment variable
vercel env add VITE_API_URL production
# Paste your Railway URL when prompted

# Redeploy
vercel --prod
```

## Step 3: Test

1. Open your Vercel URL
2. Try to register a new account
3. Should work! ✅

## Local Development

```bash
# Install dependencies
npm run install:all

# Run both servers
npm run dev
```

Frontend: http://localhost:5175
Backend: http://localhost:3001

## Troubleshooting

### "Server error" on registration
- Check Railway logs: `railway logs`
- Verify MONGO_URI is correct
- Verify JWT_SECRET is set

### CORS errors
- Make sure Railway backend has CORS enabled (already configured in `server/src/app.js`)

### API not connecting
- Verify `VITE_API_URL` is set on Vercel
- Check Railway URL is correct (no trailing slash)
