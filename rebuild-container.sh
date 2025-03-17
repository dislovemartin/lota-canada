#!/bin/bash

echo "Rebuilding the development container..."
echo "This will rebuild the container with the latest configuration."

# Create MCP directory if it doesn't exist
if [ ! -d "$HOME/.mcp" ]; then
  echo "Creating MCP directory at $HOME/.mcp"
  mkdir -p "$HOME/.mcp"
  chmod 755 "$HOME/.mcp"
fi

# Check if MCP_API_KEY is set
if [ -z "$MCP_API_KEY" ]; then
  echo "WARNING: MCP_API_KEY environment variable is not set."
  echo "MCP tools will not work properly without this key."
  echo "Please set the MCP_API_KEY environment variable before rebuilding the container."
  echo ""
  echo "You can set it temporarily with:"
  echo "  export MCP_API_KEY=your_api_key"
  echo ""
  echo "Or permanently in your shell profile (~/.bashrc, ~/.zshrc, etc.)."
  echo ""
  read -p "Do you want to continue without setting MCP_API_KEY? (y/n) " -n 1 -r
  echo ""
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Rebuild cancelled. Please set MCP_API_KEY and try again."
    exit 1
  fi
fi

# Check if running in VS Code
if [ -z "$VSCODE_CLI" ]; then
  echo "Please run this command in VS Code terminal:"
  echo "  1. Press Ctrl+Shift+P (or Cmd+Shift+P on Mac)"
  echo "  2. Type 'Remote-Containers: Rebuild Container' and press Enter"
  echo "  3. Wait for the container to rebuild"
else
  # If running in VS Code, we can try to execute the command
  echo "Executing 'Remote-Containers: Rebuild Container' command..."
  code --remote-containers rebuild
fi

echo ""
echo "After rebuilding, your container will have:"
echo "  - React 19 compatibility with --legacy-peer-deps"
echo "  - MCP tools for AI-powered development"
echo "  - Browser tools for testing and previewing"
echo ""
echo "For more information, see .devcontainer/README-MCP-BROWSER-TOOLS.md"
