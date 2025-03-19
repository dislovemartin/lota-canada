ARG VARIANT="20-bullseye"
FROM mcr.microsoft.com/devcontainers/javascript-node:${VARIANT}

# Install additional OS packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    # Browser dependencies
    wget \
    curl \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgcc1 \
    libglib2.0-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    # Development utilities
    htop \
    vim \
    git \
    jq \
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* /var/tmp/*

# Configure system limits and performance
RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf \
    && echo "fs.inotify.max_user_instances=512" >> /etc/sysctl.conf \
    && echo "vm.max_map_count=262144" >> /etc/sysctl.conf \
    && echo "kernel.pid_max=65535" >> /etc/sysctl.conf \
    && echo "vm.swappiness=10" >> /etc/sysctl.conf \
    && echo "vm.vfs_cache_pressure=50" >> /etc/sysctl.conf

# Set up directories and permissions before switching to node user
RUN mkdir -p /home/node/.npm \
    && mkdir -p /home/node/.cache/yarn \
    && mkdir -p /home/node/.local/share/npm \
    && mkdir -p /home/node/.config \
    && mkdir -p /home/node/.mcp/{cache,config,logs} \
    && mkdir -p /ms-playwright \
    && chown -R node:node /home/node \
    && chmod -R 755 /home/node

# Install global packages with optimized settings
ENV NODE_ENV=development \
    NPM_CONFIG_LOGLEVEL=error \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_PREFER_OFFLINE=true \
    YARN_CACHE_FOLDER=/home/node/.cache/yarn \
    NEXT_TELEMETRY_DISABLED=1

# Switch to node user for package installations
USER node

RUN npm install -g npm@latest pnpm@latest yarn@latest typescript@latest \
    && npm config set maxsockets 50 \
    && npm config set legacy-peer-deps true \
    && npm cache clean --force \
    && yarn cache clean

# Install Playwright browsers with minimal footprint
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright \
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

USER root
RUN npx playwright install chromium --with-deps \
    && chown -R node:node /ms-playwright

# Set up Cypress dependencies
ENV CYPRESS_INSTALL_BINARY=0

# Configure environment for MCP and Node.js with optimized settings
ENV MCP_CACHE_DIR=/home/node/.mcp/cache \
    MCP_CONFIG_DIR=/home/node/.mcp/config \
    MCP_LOG_DIR=/home/node/.mcp/logs \
    MCP_SERVER_PORT=3099 \
    NODE_OPTIONS="--max-old-space-size=1536 --max-http-header-size=8192" \
    MALLOC_ARENA_MAX=2 \
    NODE_NO_WARNINGS=1 \
    NEXT_TELEMETRY_DISABLED=1

# Set up the workspace directory with proper permissions
WORKDIR /workspace
RUN chown -R node:node /workspace

# Switch back to node user for security
USER node
