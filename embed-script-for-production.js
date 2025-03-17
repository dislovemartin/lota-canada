// components/LOTALLMEmbed.js
import Script from 'next/script';

export default function LOTALLMEmbed({ embedId }) {
  // Use environment variables to configure the embed for different environments
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