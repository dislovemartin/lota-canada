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

// Usage in your layout.js or page.js:
// import LOTALLMEmbed from '@/components/LOTALLMEmbed';
// 
// export default function Layout({ children }) {
//   return (
//     <>
//       {children}
//       <LOTALLMEmbed embedId="your-actual-embed-id" />
//     </>
//   );
// } 