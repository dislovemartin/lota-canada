/**
 * LOTA-LLM Server Configuration
 * 
 * This file contains the configuration for the LOTA-LLM server.
 * It is used by the API routes to communicate with the LOTA-LLM server.
 */

// The URL of the LOTA-LLM server
export const LOTA_LLM_SERVER_URL = process.env.LOTA_LLM_SERVER_URL || 'http://localhost:2000';

// The API endpoint for the LOTA-LLM embed API
export const LOTA_LLM_EMBED_API_URL = `${LOTA_LLM_SERVER_URL}/api/embed`;

// The default embed ID to use if none is provided
export const DEFAULT_EMBED_ID = 'default-embed-id';

// Configuration for the LOTA-LLM chat widget
export const LOTA_LLM_CHAT_CONFIG = {
  buttonColor: '#4a6cf7',
  greeting: 'Hello! I\'m the LOTA AI Assistant. How can I help you today?',
  assistantName: 'LOTA AI Assistant',
  position: 'bottom-right' as const,
}; 