#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting GitHub deployment process for LoTA Canada website...${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install git and try again.${NC}"
    exit 1
fi

# Check if the repository is already initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing git repository...${NC}"
    git init
fi

# Add all files to git
echo -e "${YELLOW}Adding files to git...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
git commit -m "Deployment commit"

# Ask for GitHub repository URL
echo -e "${YELLOW}Please enter your GitHub repository URL (e.g., https://github.com/username/repo.git):${NC}"
read repo_url

# Add remote if it doesn't exist
if ! git remote | grep -q "origin"; then
    echo -e "${YELLOW}Adding remote origin...${NC}"
    git remote add origin $repo_url
else
    echo -e "${YELLOW}Remote origin already exists. Updating...${NC}"
    git remote set-url origin $repo_url
fi

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push -u origin main || git push -u origin master

echo -e "${GREEN}Code pushed to GitHub successfully!${NC}"
echo -e "${YELLOW}Now you can connect this repository to Vercel for deployment:${NC}"
echo -e "${YELLOW}1. Go to https://vercel.com/new${NC}"
echo -e "${YELLOW}2. Import your GitHub repository${NC}"
echo -e "${YELLOW}3. Configure your project settings${NC}"
echo -e "${YELLOW}4. Deploy!${NC}"

echo -e "${GREEN}Deployment process completed!${NC}" 