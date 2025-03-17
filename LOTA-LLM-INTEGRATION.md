# LOTA-LLM Integration

This document provides an overview of the LOTA-LLM integration into the LOTA Canada website.

## Overview

The LOTA-LLM integration consists of:

1. **Docker Container**: The backend AI service running on port 2000
2. **Next.js API Routes**: API routes that proxy requests to the LOTA-LLM server
3. **Chat Widget Component**: The `LOTALLMChat` component that embeds the chat widget into the website
4. **Feature Flags**: A system to easily enable/disable the chat widget without changing code
5. **Embedded Interface**: A dedicated page that embeds the full LOTA-LLM interface

## Files

### Server Files

- `/SolnAI-llm/docker/docker-compose.yml`: Docker Compose configuration for the LOTA-LLM server
- `/SolnAI-llm/docker/.env`: Environment variables for the LOTA-LLM server

### Next.js Files

- `/components/LOTALLMChat.tsx`: The React component that renders the chat widget
- `/lib/lota-llm-config.ts`: Configuration for the LOTA-LLM integration
- `/lib/featureFlags.ts`: Feature flag system including the `ENABLE_LOTA_LLM_CHAT` flag
- `/app/api/lota-llm/route.ts`: API route that proxies requests to the LOTA-LLM server
- `/public/embed/lota-llm-chat-widget.min.js`: The chat widget script
- `/public/embed/lota-llm-chat-widget.min.css`: The chat widget styles
- `/app/lota-llm/page.tsx`: The page that embeds the full LOTA-LLM interface
- `/app/lota-llm/layout.tsx`: The layout for the LOTA-LLM interface page
- `/.env.local`: Local development environment variables
- `/.env.production.example`: Example production environment variables
- `/.env`: Server-side environment variables

## Setup

1. **Start the Docker Container**:
   ```bash
   cd /home/ubuntu/workspace/lota-canada/SolnAI-llm/docker
   docker-compose up -d
   ```

2. **Access the LOTA-LLM Web Interface**:
   - Open a web browser and navigate to `http://localhost:2000`
   - Create an account with the following credentials:
     - Username: `admin`
     - Password: `password123`
     - Role: `admin`
   - Create a workspace called "LOTA Knowledge Base"
   - Enable embedding for the workspace and copy the embed ID
   - Update the `DEFAULT_EMBED_ID` in `lib/lota-llm-config.ts` with the actual embed ID

3. **Enable the Chat Widget**:
   - The chat widget is enabled by default in the `.env.local` file
   - You can disable it by setting `NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT=false` in the `.env.local` file

## Usage

The LOTA-LLM chat widget is integrated into the main layout and will appear in the bottom-right corner of the website when enabled. It can be toggled on/off using the `NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT` environment variable.

### Embedded Interface

A dedicated page is available at `/lota-llm` that embeds the full LOTA-LLM interface. This page can be accessed from the main navigation menu by clicking on "LOTA AI".

The embedded interface provides access to all the features of the LOTA-LLM system, including:

- Chat with the AI assistant
- Browse and search the knowledge base
- Upload and manage documents
- Configure workspaces and settings

The embedded interface uses an iframe to display the LOTA-LLM web interface within your website. The URL for the iframe is controlled by the `NEXT_PUBLIC_LOTA_LLM_SERVER_URL` environment variable.

### Local Development

For local development, the chat widget is enabled by default. You can disable it by setting `NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT=false` in your `.env.local` file.

### Production

For production deployment, you'll need to:

1. Deploy the LOTA-LLM Docker container to a server with a domain name
2. Configure HTTPS for the LOTA-LLM server
3. Update the `LOTA_LLM_SERVER_URL` in your server environment variables
4. Update the `NEXT_PUBLIC_LOTA_LLM_SERVER_URL` in your client environment variables
5. Deploy your Next.js application

## Demo

A demo page is available at `/lota-llm-demo` that showcases the chat widget and provides information about how to use it.

## Customization

The chat widget can be customized by modifying the `LOTA_LLM_CHAT_CONFIG` object in `lib/lota-llm-config.ts`:

```typescript
export const LOTA_LLM_CHAT_CONFIG = {
  buttonColor: '#4a6cf7',
  greeting: 'Hello! I\'m the LOTA AI Assistant. How can I help you today?',
  assistantName: 'LOTA AI Assistant',
  position: 'bottom-right' as const,
};
```

## Security Considerations

- Set `CHAT_EMBED_WHITELIST` in the LOTA-LLM server `.env` file to restrict which domains can embed the chat widget
- Use HTTPS for both your website and the LOTA-LLM server
- Secure your LOTA-LLM instance with proper authentication
- For the embedded interface, consider implementing additional authentication if needed 