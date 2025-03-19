#!/bin/bash

set -e

# Function to handle errors
handle_error() {
  echo "Error occurred in script at line: $1"
  exit 1
}

trap 'handle_error $LINENO' ERR

# Ensure we're running as root
if [ "$(id -u)" != "0" ]; then
  echo "This script must be run as root" 1>&2
  exit 1
fi

echo "Installing MCP CLI tools..."

# Create MCP directories if they don't exist
mkdir -p /home/node/.mcp/{cache,config,logs}

# Set proper permissions
chown -R node:node /home/node/.mcp
chmod 755 /home/node/.mcp
chmod 755 /home/node/.mcp/{cache,config,logs}

# Install MCP dependencies with reduced memory usage
echo "Installing MCP dependencies..."
export NODE_OPTIONS="--max-old-space-size=512"
cd /home/node/.mcp

# Install specific versions of required packages
echo "Installing required packages..."
npm install --no-fund --no-audit --prefer-offline \
  @mcp/cli@latest \
  @mcp/server@latest \
  @mcp/types@latest \
  @mcp/utils@latest

# Clean up npm cache to free memory
echo "Cleaning up..."
npm cache clean --force
rm -rf /tmp/* /var/tmp/*

# Set up MCP configuration
echo "Setting up MCP configuration..."
cat >/home/node/.mcp/config/mcp-config.json <<'EOF'
{
    "server": {
        "port": 3099,
        "maxMemory": 512,
        "logLevel": "info"
    },
    "cache": {
        "maxSize": 256,
        "ttl": 3600
    },
    "performance": {
        "optimization": true,
        "compression": true
    }
}
EOF

# Set proper ownership
chown -R node:node /home/node/.mcp
chmod 644 /home/node/.mcp/config/mcp-config.json

echo "MCP CLI tools installation complete!"

# Configure MCP
configure_mcp() {
  local config_dir="/home/node/.mcp/config"
  local credentials_file="$config_dir/credentials.json"
  local server_config_file="$config_dir/server.json"

  # Ensure config directory exists and has correct permissions
  mkdir -p "$config_dir"
  chown node:node "$config_dir"
  chmod 755 "$config_dir"

  # Create server configuration if it doesn't exist
  if [ ! -f "$server_config_file" ]; then
    echo "{
        \"server\": {
            \"port\": 3099,
            \"host\": \"localhost\",
            \"maxMemory\": 4096,
            \"autoStart\": true,
            \"logLevel\": \"info\"
        },
        \"cache\": {
            \"directory\": \"/home/node/.mcp/cache\",
            \"maxSize\": 1024,
            \"cleanupInterval\": 3600
        },
        \"logging\": {
            \"directory\": \"/home/node/.mcp/logs\",
            \"level\": \"info\",
            \"maxFiles\": 5,
            \"maxSize\": \"10m\"
        },
        \"performance\": {
            \"optimization\": true,
            \"maxConcurrentRequests\": 10,
            \"timeout\": 30000
        }
    }" >"$server_config_file"
    chown node:node "$server_config_file"
    chmod 600 "$server_config_file"
  fi

  # Configure API key if available
  if [ -n "$MCP_API_KEY" ]; then
    echo "{\"apiKey\": \"$MCP_API_KEY\"}" >"$credentials_file"
    chown node:node "$credentials_file"
    chmod 600 "$credentials_file"
  fi
}

# Configure MCP
configure_mcp

# Start MCP server with health check
start_mcp_server() {
  echo "Starting MCP server..."
  if ! sudo -u node mcp server start --config /home/node/.mcp/config/server.json >/home/node/.mcp/logs/server.log 2>&1 & then
    echo "ERROR: Failed to start MCP server"
    exit 1
  fi

  local pid=$!
  echo $pid >/home/node/.mcp/server.pid
  chown node:node /home/node/.mcp/server.pid

  # Wait for server to start
  local max_attempts=30
  local attempt=1
  local wait_time=2

  echo "Checking MCP server health..."
  while [ $attempt -le $max_attempts ]; do
    if curl -s http://localhost:3099/health >/dev/null; then
      echo "MCP server is healthy!"
      return 0
    fi
    echo "Attempt $attempt/$max_attempts: MCP server not ready yet..."
    sleep $wait_time
    attempt=$((attempt + 1))
  done

  echo "ERROR: MCP server failed to start properly"
  return 1
}

# Verify MCP CLI installation
if ! mcp --version; then
  echo "ERROR: MCP CLI installation failed"
  exit 1
fi

# Start MCP server
if ! start_mcp_server; then
  echo "ERROR: MCP server health check failed"
  exit 1
fi

# Setup cleanup on exit
cleanup() {
  if [ -f /home/node/.mcp/server.pid ]; then
    pid=$(cat /home/node/.mcp/server.pid)
    sudo -u node kill "$pid" 2>/dev/null || true
    rm /home/node/.mcp/server.pid
  fi
}
trap cleanup EXIT

echo "MCP setup complete!"
