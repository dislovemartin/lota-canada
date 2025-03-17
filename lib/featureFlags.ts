/**
 * Feature flags for the application
 * 
 * This allows us to easily enable/disable features without changing code.
 * Can be connected to a remote feature flag service in the future.
 */

// Feature flags can be overridden by environment variables
const FEATURE_FLAGS = {
    // LOTA-LLM Chat Widget
    ENABLE_LOTA_LLM_CHAT: process.env.NEXT_PUBLIC_ENABLE_LOTA_LLM_CHAT === 'true' || false,

    // Add other feature flags here
};

export default FEATURE_FLAGS; 