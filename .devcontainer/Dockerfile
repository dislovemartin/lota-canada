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
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install global packages
RUN npm install -g npm@latest pnpm@latest yarn@latest typescript@latest

# Set up Cypress dependencies
ENV CYPRESS_INSTALL_BINARY=0
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# Set up the workspace directory
WORKDIR /workspace

# Set up permissions for node user
RUN chown -R node:node /workspace

# Switch to node user
USER node