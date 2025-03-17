# LOTA-LLM Deployment Guide

This guide explains how to deploy the LOTA-LLM integration without affecting your existing website.

## Overview

The LOTA-LLM integration consists of:
1. The LOTA-LLM Docker container
2. The Next.js component for embedding the chat widget

## Deployment Steps

### 1. Deploy the LOTA-LLM Docker Container

1. Navigate to the SolnAI-llm/docker directory:
   ```bash
   cd SolnAI-llm/docker
   ```

2. Make sure the .env file is properly configured:
   ```bash
   # Check if these settings are enabled
   ENABLE_CHAT_EMBED=true
   CHAT_EMBED_WHITELIST="*" # For production, set to your domain(s)
   MULTI_USER_MODE=true
   AUTH_TOKEN=true
   ```

3. Start the Docker container:
   ```bash
   docker-compose down && docker-compose up -d
   ```

4. Verify the container is running:
   ```bash
   docker ps | grep lota-llm
   ```

### 2. Configure LOTA-LLM

1. Access the LOTA-LLM interface at http://localhost:2000
2. Create an account (since multi-user mode is enabled)
3. Create a workspace
4. Upload documents to the workspace
5. Go to Settings > Embedding in the workspace
6. Enable embedding and copy the embed ID

### 3. Add the Component to Your Next.js Website

1. Copy the `LOTALLMChat.tsx` component to your components directory
2. Copy the `featureFlags.ts` file to your lib directory
3. Add the component to your layout file:

```tsx
import FEATURE_FLAGS from '@/lib/featureFlags';
import LOTALLMChat from '@/components/LOTALLMChat';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* LOTA-LLM Chat Widget - Only rendered when feature flag is enabled */}
        <LOTALLMChat 
          embedId="your-embed-id-here" // Replace with your actual embed ID
          disabled={!FEATURE_FLAGS.ENABLE_LOTA_LLM_CHAT}
        />
      </body>
    </html>
  );
}
```

### 4. Configure Environment Variables

1. For development, create a `.env.local` file in your Next.js project root:
   ```
   # Disable by default to avoid affecting the website during development
   NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT=false
   
   # LOTA-LLM URLs (for local development)
   NEXT_PUBLIC_LOTA_LLM_API_URL=http://localhost:2000/api/embed
   NEXT_PUBLIC_LOTA_LLM_SCRIPT_URL=http://localhost:2000/embed/lota-llm-chat-widget.min.js
   ```

2. For production, set these environment variables in your deployment platform:
   ```
   # Enable the chat widget in production
   NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT=true
   
   # LOTA-LLM URLs (for production)
   NEXT_PUBLIC_LOTA_LLM_API_URL=https://your-lota-llm-instance.com/api/embed
   NEXT_PUBLIC_LOTA_LLM_SCRIPT_URL=https://your-lota-llm-instance.com/embed/lota-llm-chat-widget.min.js
   ```

## Production Deployment

For production deployment:

1. Deploy the LOTA-LLM Docker container to a server with a domain name
2. Configure HTTPS for the LOTA-LLM server
3. Update the `CHAT_EMBED_WHITELIST` in the LOTA-LLM .env file to include only your domain(s)
4. Set the environment variables in your Next.js deployment platform
5. Deploy your Next.js application

## Troubleshooting

- If the chat widget doesn't appear, check that the feature flag is enabled
- Verify that the LOTA-LLM server is running and accessible
- Check the browser console for any errors
- Make sure you've replaced the embed ID with your actual ID from LOTA-LLM
- Ensure that your domain is allowed in the `CHAT_EMBED_WHITELIST`

## Security Considerations

- Set `CHAT_EMBED_WHITELIST` to restrict which domains can embed the chat widget
- Use HTTPS for both your website and the LOTA-LLM server
- Consider setting limits on the number of chats per embedding and per session
- Secure your LOTA-LLM instance with proper authentication 