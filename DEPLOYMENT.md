# Deploying LoTA Canada to Vercel

This guide provides instructions on how to deploy the LoTA Canada website to Vercel.

## Prerequisites

- A [Vercel](https://vercel.com) account
- A [GitHub](https://github.com) account (optional, but recommended)

## Option 1: Deploy via GitHub (Recommended)

### Step 1: Push your code to GitHub

You can use the provided script to push your code to GitHub:

```bash
./deploy-to-github.sh
```

Follow the prompts to push your code to a GitHub repository.

### Step 2: Connect to Vercel

1. Go to [Vercel's New Project page](https://vercel.com/new)
2. Import your GitHub repository
3. Configure your project settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install --legacy-peer-deps`
4. Add any necessary environment variables from your `.env` file
5. Click "Deploy"

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
vercel --prod
```

## Troubleshooting

If you encounter build errors during deployment, try the following:

1. **Duplicate files**: Check for duplicate files with both `.jsx` and `.tsx` extensions in the same directory. Remove one of them.

2. **Environment variables**: Make sure all required environment variables are set in your Vercel project settings.

3. **Dependencies**: If you encounter dependency issues, try deploying with the `--legacy-peer-deps` flag:

```bash
vercel --prod --build-env NPM_FLAGS="--legacy-peer-deps"
```

4. **Build command**: If the default build command fails, try modifying it in your `vercel.json` file:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

## Continuous Deployment

Once your project is connected to GitHub and deployed to Vercel, any new commits pushed to your repository will automatically trigger a new deployment.

## Manual Deployment

You can manually trigger a new deployment from the Vercel dashboard or by running:

```bash
vercel --prod
``` 