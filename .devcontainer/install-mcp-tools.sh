#!/bin/bash

# Script to install MCP CLI tools in the dev container

echo "Installing MCP CLI tools..."

# Create MCP directories if they don't exist
sudo mkdir -p /home/node/.mcp
sudo mkdir -p /home/ubuntu/.mcp

# Set proper permissions
sudo chown -R node:node /home/node/.mcp
sudo chown -R ubuntu:ubuntu /home/ubuntu/.mcp

# Create a symbolic link to ensure both locations work
sudo ln -sf /home/ubuntu/.mcp/* /home/node/.mcp/ 2>/dev/null || true

# Install MCP CLI
npm install -g @mcp/cli

echo "MCP CLI tools installation complete!"

# Check if MCP_API_KEY is set
if [ -z "$MCP_API_KEY" ]; then
  echo "WARNING: MCP_API_KEY environment variable is not set."
  echo "MCP tools may not work properly without this key."
  echo "You can set it with: export MCP_API_KEY=your_api_key"
else
  # Store the API key in the MCP config directory
  echo "Configuring MCP API key..."
  mkdir -p /home/node/.mcp/config
  echo "{\"apiKey\": \"$MCP_API_KEY\"}" > /home/node/.mcp/config/credentials.json
  chmod 600 /home/node/.mcp/config/credentials.json
fi

# Check if MCP CLI is installed correctly
echo "Verifying MCP CLI installation..."
mcp --version || echo "MCP CLI installation failed. Please check your API key and try again."

echo "Setup complete!" 