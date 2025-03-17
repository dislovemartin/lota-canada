# Lota Project

This is the Lota project, a Next.js application deployed on Vercel.

## Deployment

This project is automatically deployed to Vercel using GitHub Actions.

[![Deploy to Vercel](https://github.com/dislovemartin/lota-canada/actions/workflows/deploy.yml/badge.svg)](https://github.com/dislovemartin/lota-canada/actions/workflows/deploy.yml)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## React 19 Compatibility

This project uses React 19, which is the latest version of React. However, some dependencies haven't updated their peer dependencies to support React 19 yet. To handle this, we use the `--legacy-peer-deps` flag when installing dependencies.

### Development Container Setup

When using the development container:

1. The container will automatically install all dependencies and start the development server.
2. The container includes all necessary tools for development, including Node.js, npm, and Git.
3. The container also includes MCP tools and browser tools for enhanced development experience.

### MCP and Browser Tools

The development container includes MCP (Multi-Cloud Platform) tools and browser tools:

#### MCP Tools
- MCP VS Code Extension for AI-powered code completion and assistance
- MCP CLI for command-line interface to MCP services

To use MCP tools, you need to set the `MCP_API_KEY` environment variable on your host machine before starting the container. You can use the provided setup script:

```bash
# Make the script executable
chmod +x setup-mcp.sh

# Run the setup script
./setup-mcp.sh
```

The script will:
- Create the necessary MCP directories
- Prompt you for your MCP API key
- Store the API key in the MCP config directory
- Add the API key to your shell profile
- Set the environment variable for the current session

#### Browser Tools
- Playwright for end-to-end testing with browser automation
- Browser Preview for previewing web pages in VS Code
- Live Server for launching a local development server

For more details, see [MCP and Browser Tools Documentation](.devcontainer/README-MCP-BROWSER-TOOLS.md).

### Manual Installation

If you're not using the development container, install dependencies with:

```bash
npm install --legacy-peer-deps
```

## Project Structure

The project follows a structured approach to organize the codebase efficiently. Below is an overview of the project structure:

```
lota-canada/
├── app/                  # Next.js App Router pages
├── components/           # Reusable React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   └── [feature]/        # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and shared code
├── public/               # Static assets
└── styles/               # Global styles
```

## TypeScript Standards

This project uses TypeScript for type safety and better developer experience. Follow these guidelines:

1. **Use TypeScript for all new files**: Create `.tsx` for React components and `.ts` for utility functions.
2. **Avoid JavaScript files**: Do not create new `.jsx` or `.js` files.
3. **Type definitions**: Define interfaces and types for component props and function parameters.
4. **Strict mode**: TypeScript is configured in strict mode. Avoid using `any` type when possible.

## Component Guidelines

1. **Component Organization**:

   - UI components go in `components/ui/`
   - Feature-specific components go in `components/[feature]/`

2. **Component Structure**:

   - Use functional components with hooks
   - Define prop types with interfaces
   - Export components as named exports when appropriate

3. **Component Example**:

   ```tsx
   import { FC } from "react";

   interface ButtonProps {
     variant?: "primary" | "secondary";
     size?: "sm" | "md" | "lg";
     children: React.ReactNode;
     onClick?: () => void;
   }

   export const Button: FC<ButtonProps> = ({
     variant = "primary",
     size = "md",
     children,
     onClick,
   }) => {
     // Component implementation
   };
   ```

## Import Standards

1. **Import Order**:

   - React and Next.js imports first
   - Third-party libraries next
   - Project imports last
   - Separate each group with a blank line

2. **Import Paths**:
   - Use absolute imports with `@/` prefix for project files
   - Example: `import { Button } from "@/components/ui/button";`

## Common Issues and Solutions

### Duplicate Page Errors

If you see warnings like `Duplicate page detected. app/page.jsx and app/page.tsx resolve to /`:

1. Use the cleanup script to remove duplicate files
2. Ensure you're only using TypeScript files

### Component Import Errors

If you encounter errors like `Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined`:

1. Check that the component is properly exported
2. Verify the import path is correct
3. Run the fix-imports script to standardize imports

## Scripts

### Cleanup Duplicates Script

This script identifies and removes duplicate `.jsx` files where `.tsx` versions exist.

```bash
# Make the script executable
chmod +x cleanup-duplicates.sh

# Run the script
./cleanup-duplicates.sh
```

The script will:

- Find all `.jsx` files in the app, components, lib, and hooks directories
- Check if a corresponding `.tsx` file exists
- Ask for confirmation before removing each duplicate file

### Fix Imports Script

This script identifies and fixes component import inconsistencies.

```bash
# Make the script executable
chmod +x fix-imports.sh

# Run the script
./fix-imports.sh
```

The script will:

- Find all TypeScript and JavaScript files in the project
- Check for UI component imports
- Replace any temporary component imports with the standard ones

### TypeScript Check Script

This script checks for TypeScript errors in the project.

```bash
# Make the script executable
chmod +x check-typescript.sh

# Run the script
./check-typescript.sh
```

The script will:

- Run the TypeScript compiler in noEmit mode
- Report any type errors found in the project

## Additional Resources

For more detailed information about the project structure and TypeScript standards, refer to the `PROJECT_STRUCTURE.md` and `README-TYPESCRIPT.md` files.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

# LOTA-LLM Website Integration Demo

This project demonstrates how to deploy LOTA-LLM locally and integrate it into a website using the embed widget.

## Prerequisites

- Docker installed on your machine
- Node.js installed on your machine
- An OpenAI API key (or another supported LLM provider)

## Setup Instructions

### 1. Deploy LOTA-LLM

1. Navigate to the SolnAI-llm/docker directory:
   ```
   cd SolnAI-llm/docker
   ```

2. Edit the `.env` file and set your OpenAI API key:
   ```
   OPEN_AI_KEY='your-openai-api-key-here'
   ```

3. Start the LOTA-LLM Docker container:
   ```
   docker-compose up -d
   ```

4. Access LOTA-LLM at http://localhost:3001

### 2. Configure LOTA-LLM

1. Create an account (since multi-user mode is enabled)
2. Create a workspace
3. Upload documents to the workspace
4. Go to Settings > Embedding in the workspace
5. Enable embedding and copy the embed ID

### 3. Update the Website

1. Edit the `website-with-embed.html` file and replace `your-embed-id-here` with your actual embed ID from LOTA-LLM.

### 4. Start the Website

1. Start the website server:
   ```
   node server.js
   ```

2. Access the website at http://localhost:8080

## How It Works

- LOTA-LLM runs in a Docker container and provides the backend for document processing, vector storage, and LLM integration.
- The embed widget is loaded from the LOTA-LLM server and injected into your website.
- The embed widget connects to your LOTA-LLM instance and allows users to chat with your documents.

## Customization

You can customize the embed widget by modifying the data attributes in the script tag:

```html
<script
    data-embed-id="your-embed-id-here" 
    data-base-api-url="http://localhost:3001/api/embed"
    data-button-color="#4a6cf7"
    data-greeting="Hello! How can I help you today?"
    data-assistant-name="Your Company Assistant"
    data-position="bottom-right"
    src="http://localhost:3001/embed/lota-llm-chat-widget.min.js"
></script>
```

See the [LOTA-LLM Embed documentation](https://github.com/dislovemartin/lota-llm-embed) for more customization options.

## Production Deployment

For production deployment:

1. Deploy LOTA-LLM to a server with a domain name
2. Update the `data-base-api-url` to point to your production LOTA-LLM instance
3. Update the `src` attribute to point to your production LOTA-LLM embed script
4. Deploy your website to a production server

## Security Considerations

- Make sure to set the `CHAT_EMBED_WHITELIST` in the LOTA-LLM `.env` file to restrict which domains can embed the chat widget
- Consider setting limits on the number of chats per embedding and per session
- Secure your LOTA-LLM instance with proper authentication and HTTPS
