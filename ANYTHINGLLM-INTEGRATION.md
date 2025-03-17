# LOTA-LLM Integration Guide

This guide explains how to use the LOTA-LLM chat widget integration without affecting your existing website.

## Overview

The integration is designed to be:
- **Non-intrusive**: Won't affect your existing website functionality
- **Easy to toggle**: Can be enabled/disabled with a feature flag
- **Customizable**: Appearance can be adjusted to match your website
- **Isolated**: Runs in its own Docker container

## How to Use

### 1. Enable/Disable the Chat Widget

The chat widget is controlled by a feature flag. To enable it:

```bash
# In your .env.local file
NEXT_PUBLIC_ENABLE_AI_CHAT=true
```

To disable it, set to `false` or remove the variable.

### 2. Configure the Chat Widget

You can customize the chat widget by modifying the props in your layout:

```tsx
<LOTA-LLMChat 
  embedId="your-embed-id-here" 
  disabled={!FEATURE_FLAGS.ENABLE_AI_CHAT}
  buttonColor="#your-brand-color"
  greeting="Custom greeting message"
  assistantName="Your Brand Assistant"
  position="bottom-right"
/>
```

### 3. For Production

For production deployment, add these environment variables:

```bash
NEXT_PUBLIC_LOTA-LLM_API_URL=https://your-LOTA-LLM-instance.com/api/embed
NEXT_PUBLIC_LOTA-LLM_SCRIPT_URL=https://your-LOTA-LLM-instance.com/embed/LOTA-LLM-chat-widget.min.js
```

## LOTA-LLM Setup

1. Make sure the LOTA-LLM Docker container is running
2. Create a workspace and upload your documents
3. Enable embedding for the workspace
4. Copy the embed ID and update it in your layout

## Troubleshooting

- If the chat widget doesn't appear, check that the feature flag is enabled
- Verify that the LOTA-LLM server is running and accessible
- Check the browser console for any errors
- Make sure you've replaced the embed ID with your actual ID from LOTA-LLM 