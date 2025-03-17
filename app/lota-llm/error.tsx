'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('LOTA AI Interface Error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="text-center max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Image 
            src="/images/brand/lota-logo.svg" 
            alt="LOTA Logo" 
            width={60} 
            height={60}
            className="rounded-md bg-white p-1"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error Loading LOTA AI Knowledge Base</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          There was an error connecting to the LOTA AI server. This could be because:
        </p>
        <ul className="list-disc text-left mb-6 pl-8 text-gray-700 dark:text-gray-300">
          <li>The LOTA AI server is not running</li>
          <li>There's a network issue connecting to the server</li>
          <li>The server URL is incorrect</li>
          <li>The server is experiencing technical difficulties</li>
        </ul>
        <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Error details:</p>
          <p className="text-sm mt-2 text-red-500 break-words">
            {error.message || 'Unknown error'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 