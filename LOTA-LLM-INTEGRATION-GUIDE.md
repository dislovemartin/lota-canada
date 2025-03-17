# LOTA-LLM Integration Guide

This guide explains how to integrate LOTA-LLM with your existing website without affecting its current functionality.

## Overview

LOTA-LLM is a powerful tool that allows you to create a chatbot based on your own documents. This integration adds a chat widget to your website that connects to your LOTA-LLM instance.

## Prerequisites

- Docker installed on your server
- Access to your website's codebase
- An OpenAI API key (or another supported LLM provider)

## Integration Steps

### 1. Deploy LOTA-LLM

1. Clone the LOTA-LLM repository:
   ```bash
   git clone https://github.com/dislovemartin/SolnAI-llm.git
   ```

2. Navigate to the docker directory:
   ```bash
   cd SolnAI-llm/docker
   ```

3. Create and configure the .env file:
   ```bash
   cp .env.example .env
   ```

4. Edit the .env file and set:
   - Your OpenAI API key: `OPEN_AI_KEY='your-openai-api-key-here'`
   - Security keys (generate with `openssl rand -hex 32`):
     ```
     SIG_KEY='generated-key-here'
     SIG_SALT='generated-salt-here'
     JWT_SECRET='generated-secret-here'
     ```
   - Enable embedding: `ENABLE_CHAT_EMBED=true`
   - Set whitelist: `CHAT_EMBED_WHITELIST="*"` (or specify your domains)
   - Enable multi-user: `MULTI_USER_MODE=true`
   - Enable auth: `AUTH_TOKEN=true`

5. Start the LOTA-LLM Docker container:
   ```bash
   docker-compose up -d
   ```

6. Access LOTA-LLM at http://localhost:2000 (or your server's address)

### 2. Configure LOTA-LLM

1. Create an account (since multi-user mode is enabled)
2. Create a workspace
3. Upload documents to the workspace
4. Go to Settings > Embedding in the workspace
5. Enable embedding and copy the embed ID

### 3. Add the Embed Script to Your Website

#### For Next.js (Current Website)

1. Create a new component for the LOTA-LLM embed:

```jsx
// components/LOTALLMEmbed.js
import Script from 'next/script';

export default function LOTALLMEmbed({ embedId }) {
  return (
    <Script
      id="lota-llm-embed"
      strategy="afterInteractive"
      data-embed-id={embedId || "your-embed-id-here"}
      data-base-api-url="http://localhost:2000/api/embed"
      data-button-color="#4a6cf7"
      data-greeting="Hello! How can I help you today?"
      data-assistant-name="Your Company Assistant"
      data-position="bottom-right"
      src="http://localhost:2000/embed/lota-llm-chat-widget.min.js"
    />
  );
}
```

2. Import and use the component in your layout or specific pages:

```jsx
// app/layout.js or any page component
import LOTALLMEmbed from '@/components/LOTALLMEmbed';

export default function Layout({ children }) {
  return (
    <>
      {children}
      <LOTALLMEmbed embedId="your-actual-embed-id" />
    </>
  );
}
```

#### For Production Deployment

For production, update the component to use environment variables:

```jsx
// components/LOTALLMEmbed.js
import Script from 'next/script';

export default function LOTALLMEmbed({ embedId }) {
  const baseApiUrl = process.env.NEXT_PUBLIC_LOTA_LLM_API_URL || "https://your-lota-llm-instance.com/api/embed";
  const scriptSrc = process.env.NEXT_PUBLIC_LOTA_LLM_SCRIPT_URL || "https://your-lota-llm-instance.com/embed/lota-llm-chat-widget.min.js";
  
  return (
    <Script
      id="lota-llm-embed"
      strategy="afterInteractive"
      data-embed-id={embedId || "your-embed-id-here"}
      data-base-api-url={baseApiUrl}
      data-button-color="#4a6cf7"
      data-greeting="Hello! How can I help you today?"
      data-assistant-name="Your Company Assistant"
      data-position="bottom-right"
      src={scriptSrc}
    />
  );
}
```

Add these environment variables to your `.env.local` file or deployment platform:

```
NEXT_PUBLIC_LOTA_LLM_API_URL=https://your-lota-llm-instance.com/api/embed
NEXT_PUBLIC_LOTA_LLM_SCRIPT_URL=https://your-lota-llm-instance.com/embed/lota-llm-chat-widget.min.js
```

## Customization

You can customize the embed widget by modifying the data attributes in the Script component:

- `data-button-color`: The chat bubble background color (hex color code)
- `data-greeting`: Default text message shown when chat is opened
- `data-assistant-name`: The name of the chat assistant
- `data-position`: Position of the chat widget (bottom-right, bottom-left, top-right, top-left)

For more customization options, see the [LOTA-LLM Embed documentation](https://github.com/dislovemartin/lota-llm-embed).

## Security Considerations

- Set `CHAT_EMBED_WHITELIST` in the LOTA-LLM `.env` file to restrict which domains can embed the chat widget
- For production, deploy LOTA-LLM on a secure server with HTTPS
- Consider setting limits on the number of chats per embedding and per session

## Troubleshooting

- If the chat widget doesn't appear, check the browser console for errors
- Ensure the LOTA-LLM server is running and accessible
- Verify that the embed ID is correct
- Check that the domain is allowed in the `CHAT_EMBED_WHITELIST` 