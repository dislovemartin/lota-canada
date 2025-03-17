import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LOTA AI Knowledge Base',
  description: 'Access the LOTA AI knowledge base to find information about leadership, professional development, and LOTA programs.',
};

export default function LOTALLMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col overflow-hidden p-0 m-0">
      {children}
    </div>
  );
} 