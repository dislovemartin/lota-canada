# LOTA-LLM Integration

This document provides an overview of the LOTA-LLM integration into the LOTA Canada website.

## What is LOTA-LLM?

LOTA-LLM is our custom AI assistant that helps users navigate our website, find information about our programs, and get answers to common questions. It's based on the original open-source platform but has been rebranded and customized for LOTA Canada by LOTA developers.

## Components

The LOTA-LLM integration consists of:

1. **Docker Container**: The backend AI service running on port 2000
2. **Next.js Component**: The `LOTALLMChat.tsx` component that embeds the chat widget into our website
3. **Feature Flags**: A system to easily enable/disable the chat widget without changing code
4. **Environment Variables**: Configuration for both development and production environments

## Files

- `/components/LOTALLMChat.tsx`: The React component that renders the chat widget
- `/lib/featureFlags.ts`: Feature flag system including the `ENABLE_LOTA_LLM_CHAT` flag
- `/.env.local`: Local development environment variables
- `/.env.production.example`: Example production environment variables
- `/LOTA-LLM-DEPLOYMENT.md`: Detailed deployment guide
- `/app/lota-llm-demo/page.tsx`: Demo page showcasing the LOTA-LLM chat widget

## Usage

The chat widget is integrated into the main layout and will appear in the bottom-right corner of the website when enabled. It can be toggled on/off using the `NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT` environment variable.

### Local Development

For local development, the chat widget is disabled by default to avoid affecting the website during development. You can enable it by setting `NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT=true` in your `.env.local` file.

### Production

For production deployment, you'll need to:

1. Deploy the LOTA-LLM Docker container to a server with a domain name
2. Configure HTTPS for the LOTA-LLM server
3. Update the environment variables in your Next.js deployment platform
4. Deploy your Next.js application

## Demo

A demo page is available at `/lota-llm-demo` that showcases the chat widget and provides information about how to use it.

## Customization

The chat widget can be customized with the following properties:

- `embedId`: The unique ID for your workspace (required)
- `disabled`: Whether the chat widget is disabled
- `apiUrl`: The URL for the LOTA-LLM API
- `scriptUrl`: The URL for the LOTA-LLM script
- `buttonColor`: The color of the chat button
- `greeting`: The initial greeting message
- `assistantName`: The name of the AI assistant
- `position`: The position of the chat widget on the screen

## Security Considerations

- Set `CHAT_EMBED_WHITELIST` to restrict which domains can embed the chat widget
- Use HTTPS for both your website and the LOTA-LLM server
- Secure your LOTA-LLM instance with proper authentication 