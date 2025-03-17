#!/bin/bash

echo "MCP Setup Script"
echo "================="
echo "This script helps you set up the MCP API key for the development container."
echo ""

# Create MCP directory if it doesn't exist
if [ ! -d "$HOME/.mcp" ]; then
  echo "Creating MCP directory at $HOME/.mcp"
  mkdir -p "$HOME/.mcp"
  chmod 755 "$HOME/.mcp"
fi

# Check if MCP_API_KEY is already set
if [ -n "$MCP_API_KEY" ]; then
  echo "MCP_API_KEY is already set in your environment."
  read -p "Do you want to update it? (y/n) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Keeping the existing MCP_API_KEY."
    exit 0
  fi
fi

# Prompt for MCP API key
echo "Please enter your MCP API key:"
read -r API_KEY

if [ -z "$API_KEY" ]; then
  echo "No API key provided. Exiting."
  exit 1
fi

# Create config directory if it doesn't exist
mkdir -p "$HOME/.mcp/config"

# Store the API key in the MCP config directory
echo "{\"apiKey\": \"$API_KEY\"}" > "$HOME/.mcp/config/credentials.json"
chmod 600 "$HOME/.mcp/config/credentials.json"

# Add the API key to the shell profile
SHELL_PROFILE=""
if [ -f "$HOME/.bashrc" ]; then
  SHELL_PROFILE="$HOME/.bashrc"
elif [ -f "$HOME/.zshrc" ]; then
  SHELL_PROFILE="$HOME/.zshrc"
elif [ -f "$HOME/.profile" ]; then
  SHELL_PROFILE="$HOME/.profile"
fi

if [ -n "$SHELL_PROFILE" ]; then
  # Check if MCP_API_KEY is already in the profile
  if grep -q "export MCP_API_KEY=" "$SHELL_PROFILE"; then
    # Update the existing line
    sed -i "s|export MCP_API_KEY=.*|export MCP_API_KEY=\"$API_KEY\"|" "$SHELL_PROFILE"
  else
    # Add a new line
    echo "" >> "$SHELL_PROFILE"
    echo "# MCP API key" >> "$SHELL_PROFILE"
    echo "export MCP_API_KEY=\"$API_KEY\"" >> "$SHELL_PROFILE"
  fi
  
  echo "Added MCP_API_KEY to $SHELL_PROFILE"
  echo "To apply the changes, run: source $SHELL_PROFILE"
else
  echo "Could not find a shell profile to update."
  echo "Please manually add the following line to your shell profile:"
  echo "export MCP_API_KEY=\"$API_KEY\""
fi

# Set the environment variable for the current session
export MCP_API_KEY="$API_KEY"

echo ""
echo "MCP API key has been set up successfully!"
echo "You can now rebuild the development container with:"
echo "./rebuild-container.sh" 