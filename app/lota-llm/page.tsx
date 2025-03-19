"use client";

import FEATURE_FLAGS from "@/lib/featureFlags";
import { LOTA_LLM_SERVER_URL } from "@/lib/lota-llm-config";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Dynamically import the iobot components
const RobotDisplay = dynamic(() => import("@/iobot/components/robot-display"), {
  ssr: false,
});

const VectorBackground = dynamic(
  () => import("@/iobot/components/vector-background"),
  {
    ssr: false,
  }
);

export default function LOTALLMPage() {
  const [isClient, setIsClient] = useState(false);
  const [serverUrl, setServerUrl] = useState(LOTA_LLM_SERVER_URL);
  const [activeTab, setActiveTab] = useState("main"); // 'main', 'documents', 'settings'
  const [showHeader, setShowHeader] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  // Only render on client-side to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
    // If we're in a browser environment, check if we need to use a different URL
    if (typeof window !== "undefined") {
      // For local development, we might need to use a different URL
      // This handles cases where the server URL might be different in the browser vs server
      const url =
        process.env.NEXT_PUBLIC_LOTA_LLM_SERVER_URL || LOTA_LLM_SERVER_URL;
      setServerUrl(url);
    }
  }, []);

  // Don't render anything during SSR
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Loading LOTA-LLM Interface...
          </h1>
          <p>Please wait while we connect to the LOTA-LLM server.</p>
        </div>
      </div>
    );
  }

  // If the feature is disabled, show a message
  if (!FEATURE_FLAGS.ENABLE_LOTA_LLM_CHAT) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">
            LOTA-LLM Interface is Disabled
          </h1>
          <p className="mb-4">
            The LOTA-LLM interface is currently disabled. Please enable it by
            setting the
            <code className="mx-1 px-2 py-1 bg-gray-100 rounded">
              NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT
            </code>
            environment variable to{" "}
            <code className="mx-1 px-2 py-1 bg-gray-100 rounded">true</code>.
          </p>
          <p>
            You can do this by updating your{" "}
            <code className="mx-1 px-2 py-1 bg-gray-100 rounded">
              .env.local
            </code>{" "}
            file.
          </p>
        </div>
      </div>
    );
  }

  // Function to get the appropriate URL based on the active tab
  const getTabUrl = (tab: string) => {
    switch (tab) {
      case "documents":
        return `${serverUrl}/documents`;
      case "settings":
        return `${serverUrl}/settings`;
      case "workspaces":
        return `${serverUrl}/workspaces`;
      default:
        return serverUrl;
    }
  };

  // Toggle header visibility
  const toggleHeader = () => {
    setShowHeader(!showHeader);
    // If hiding header, also hide intro
    if (showHeader) {
      setShowIntro(false);
    }
  };

  // Toggle intro visibility
  const toggleIntro = () => {
    setShowIntro(!showIntro);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {showHeader && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">LOTA-LLM Interface</h1>
            <p className="text-lg text-gray-600 mb-8">
              Interact with our advanced language model powered by LOTA-LLM
            </p>
          </div>
        </div>
      )}

      {/* Iobot Integration */}
      <div className="relative w-full min-h-[500px] mb-12 bg-gradient-to-b from-gray-900/5 to-transparent">
        <VectorBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Meet LOTA AI Assistant
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our intelligent AI assistant is here to help you navigate
                  through LOTA's knowledge base and answer your questions in
                  real-time.
                </p>
              </div>
              <div className="relative h-[400px]">
                <RobotDisplay position="right" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Collapsible Header with Tabs */}
        {showHeader && (
          <div className="relative">
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

            {/* Main Header Content - More compact */}
            <div className="bg-white dark:bg-gray-900 shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <Image
                        src="/images/brand/lota-logo.svg"
                        alt="LOTA Logo"
                        width={32}
                        height={32}
                        className="rounded-full bg-white p-1 border border-gray-100"
                      />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                        LOTA{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                          AI
                        </span>{" "}
                        Knowledge Base
                      </h1>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href="/"
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-md font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Home
                    </Link>
                    <a
                      href={serverUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      New Window
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav
                  className="flex space-x-4 overflow-x-auto scrollbar-hide py-1"
                  aria-label="Tabs"
                >
                  <button
                    onClick={() => setActiveTab("main")}
                    className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                      activeTab === "main"
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    Main Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab("documents")}
                    className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                      activeTab === "documents"
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    Documents
                  </button>
                  <button
                    onClick={() => setActiveTab("workspaces")}
                    className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                      activeTab === "workspaces"
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    Workspaces
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                      activeTab === "settings"
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    Settings
                  </button>
                  <div className="flex-grow"></div>
                  <button
                    onClick={toggleIntro}
                    className="px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    title={
                      showIntro ? "Hide introduction" : "Show introduction"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          showIntro
                            ? "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            : "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                      />
                    </svg>
                  </button>
                  <button
                    onClick={toggleHeader}
                    className="px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                    title="Hide header"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Introduction Section */}
        {showIntro && (
          <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-sm font-medium text-gray-900 dark:text-white">
                    Welcome to LOTA-LLM
                  </h2>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                    This AI-powered knowledge base allows you to interact with
                    LOTA's documents and resources. Ask questions in natural
                    language to get instant answers based on our knowledge base.
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                    Connected to server
                  </div>
                  <button
                    onClick={toggleIntro}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    title="Hide introduction"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOTA-LLM Interface Iframe - Takes full available space */}
        <div className="flex-grow relative bg-white dark:bg-gray-800 overflow-hidden">
          <iframe
            src={getTabUrl(activeTab)}
            className="absolute inset-0 w-full h-full border-0"
            title="LOTA AI Interface"
            allow="microphone"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
          />

          {/* Show toggle button when header is hidden */}
          {!showHeader && (
            <button
              onClick={toggleHeader}
              className="absolute top-2 right-2 z-10 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Show header"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 dark:text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
