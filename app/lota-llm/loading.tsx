import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
        <div className="flex justify-center mb-6">
          <Image 
            src="/images/brand/lota-logo.svg" 
            alt="LOTA Logo" 
            width={60} 
            height={60}
            className="rounded-md bg-white p-1"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Loading LOTA AI Knowledge Base</h1>
        <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Please wait while we connect to the LOTA AI server. This may take a few moments.
        </p>
      </div>
    </div>
  );
} 