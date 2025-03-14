#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment process for LoTA Canada website...${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Vercel CLI is not installed. Installing...${NC}"
    npm install -g vercel
fi

# Build the application
echo -e "${YELLOW}Building the application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed. Please fix the errors and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Set environment variables if needed
echo -e "${YELLOW}Setting environment variables...${NC}"
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_MONAI_WORKFLOW_API_URL

# Deploy to Vercel
echo -e "${YELLOW}Deploying to Vercel...${NC}"
echo -e "${YELLOW}You may be prompted to log in if you haven't already.${NC}"

# For preview deployment - using archive=tgz to limit file uploads
vercel --archive=tgz

# For production deployment
# Uncomment the line below to deploy to production
# vercel --prod --archive=tgz

echo -e "${GREEN}Deployment process completed!${NC}"
echo -e "${YELLOW}To deploy to production, run: vercel --prod --archive=tgz${NC}"
