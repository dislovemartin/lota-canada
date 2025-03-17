'use client';

import { useState } from 'react';
import FEATURE_FLAGS from '@/lib/featureFlags';

export default function LOTALLMDemoPage() {
  const [isEnabled, setIsEnabled] = useState(FEATURE_FLAGS.ENABLE_LOTA_LLM_CHAT);

  const toggleChat = () => {
    // This is just for demo purposes - in a real app, you would update the environment variable
    setIsEnabled(!isEnabled);
    // For demo purposes, we'll reload the page to simulate the environment variable change
    // In a real app, you would use a state management solution or context
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">LOTA-LLM Chat Widget Demo</h1>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">About LOTA-LLM</h2>
        <p className="mb-4">
          LOTA-LLM is our custom AI assistant that helps users navigate our website, 
          find information about our programs, and get answers to common questions.
        </p>
        <p className="mb-4">
          The chat widget appears in the bottom-right corner of the screen and can be 
          toggled on or off using feature flags.
        </p>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Current Status:</h3>
          <div className="flex items-center">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
          </div>
          
          <button 
            onClick={toggleChat}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isEnabled ? 'Disable Chat Widget' : 'Enable Chat Widget'}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Note: This is a demo toggle. In a production environment, this would be controlled via environment variables.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">How to Use</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click the chat icon in the bottom-right corner to open the chat widget</li>
          <li>Type your question in the input field</li>
          <li>The AI assistant will respond with relevant information</li>
          <li>You can continue the conversation or start a new one at any time</li>
        </ol>
        
        <h3 className="text-lg font-medium mt-6 mb-2">Example Questions:</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>What programs does LOTA Canada offer?</li>
          <li>How can I become a member?</li>
          <li>When is the next leadership workshop?</li>
          <li>Tell me about mentorship opportunities</li>
        </ul>
      </div>
    </div>
  );
} 