import LOTALLMChat from '@/components/LOTALLMChat';
import FEATURE_FLAGS from '@/lib/featureFlags';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Website',
  description: 'Your website description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* LOTA-LLM Chat Widget - Only rendered when feature flag is enabled */}
        <LOTALLMChat 
          embedId="your-embed-id-here" 
          disabled={!FEATURE_FLAGS.ENABLE_LOTA_LLM_CHAT}
        />
      </body>
    </html>
  );
} 