# MCP and Browser Tools Setup

This document explains the MCP (Multi-Cloud Platform) and browser tools setup in the development container.

## MCP Tools

The development container includes the following MCP-related tools:

1. **MCP VS Code Extension**: Provides AI-powered code completion and assistance.
2. **MCP CLI**: Command-line interface for MCP services.

### Configuration

The MCP tools are configured with the following settings:

- `mcp.apiKey`: Set from the environment variable `MCP_API_KEY`.
- `mcp.enableAutoCompletion`: Enabled for AI-powered code completion.
- `mcp.enableInlineChat`: Enabled for inline chat assistance.

### Setup

To use MCP tools, you need to:

1. Set the `MCP_API_KEY` environment variable on your host machine before starting the container.
2. The container will automatically create the necessary MCP directories:
   - `/home/node/.mcp` for the node user inside the container
   - `/home/ubuntu/.mcp` for the host user

The installation script will:
1. Create these directories if they don't exist
2. Set the proper permissions
3. Create a symbolic link between them to ensure both locations work
4. Store the API key in the MCP config directory if the environment variable is set

## Browser Tools

The development container includes the following browser-related tools:

1. **Playwright**: End-to-end testing framework with browser automation.
2. **Browser Preview**: VS Code extension for previewing web pages in the editor.
3. **Live Server**: VS Code extension for launching a local development server.

### Installed Browsers

The container comes with the following browsers pre-installed:

- Chromium
- Firefox
- WebKit

### Browser Dependencies

All necessary dependencies for running browsers in headless mode are pre-installed in the container.

## Usage

### MCP CLI

You can use the MCP CLI in the terminal:

```bash
mcp --version
```

### Playwright

You can run Playwright tests with:

```bash
npx playwright test
```

### Live Server

You can start a live server by:

1. Right-clicking on an HTML file
2. Selecting "Open with Live Server"

## Troubleshooting

### MCP API Key Issues

If you encounter issues with the MCP API key:

1. Ensure the `MCP_API_KEY` environment variable is set on your host machine.
2. You can set it temporarily with: `export MCP_API_KEY=your_api_key`
3. Or permanently in your shell profile (~/.bashrc, ~/.zshrc, etc.).
4. Restart the container after setting the environment variable.

### MCP Directory Issues

If you encounter issues with the MCP directory:

1. The container will automatically create the necessary MCP directories.
2. If you still encounter issues, you can manually create the directory:
   ```bash
   mkdir -p ~/.mcp
   ```

### Browser Issues

If you encounter issues with browsers:

1. Ensure the container has enough resources (memory, CPU).
2. Try reinstalling the browsers with: `npx playwright install --with-deps`

### Docker Warnings

You may see a warning like:
```
InvalidDefaultArgInFrom: Default value for ARG $BASE_IMAGE results in empty or invalid base image name
```

This is a warning from a temporary Dockerfile created by the dev container CLI and can be safely ignored. It doesn't affect the functionality of the container. 