'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

interface LOTALLMChatProps {
  embedId: string;
  disabled?: boolean;
  apiUrl?: string;
  scriptUrl?: string;
  buttonColor?: string;
  greeting?: string;
  assistantName?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

/**
 * LOTALLMChat - A component that adds the LOTA-LLM chat widget to your website
 * 
 * This component is designed to be non-intrusive and can be easily disabled.
 * It only loads the script when enabled and visible to the user.
 */
export default function LOTALLMChat({
  embedId,
  disabled = false,
  apiUrl = 'http://localhost:2000/api/embed',
  scriptUrl = 'http://localhost:2000/embed/lota-llm-chat-widget.min.js',
  buttonColor = '#4a6cf7',
  greeting = 'Hello! How can I help you today?',
  assistantName = 'AI Assistant',
  position = 'bottom-right',
}: LOTALLMChatProps) {
  const [isClient, setIsClient] = useState(false);

  // Only render on client-side to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything if disabled or during SSR
  if (disabled || !isClient) return null;

  // Use environment variables if available
  const finalApiUrl = process.env.NEXT_PUBLIC_LOTA_LLM_API_URL || apiUrl;
  const finalScriptUrl = process.env.NEXT_PUBLIC_LOTA_LLM_SCRIPT_URL || scriptUrl;

  return (
    <Script
      id="lota-llm-embed"
      strategy="lazyOnload"
      data-embed-id={embedId}
      data-base-api-url={finalApiUrl}
      data-button-color={buttonColor}
      data-greeting={greeting}
      data-assistant-name={assistantName}
      data-position={position}
      src={finalScriptUrl}
    />
  );
} 