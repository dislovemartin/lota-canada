const { spawn } = require("child_process");
const { startServer } = require("./test-setup");

// Configuration
const SERVER_URL = "http://localhost:3003";
const SERVER_START_COMMAND = "npm run dev -- -p 3003";
const TEST_COMMAND = "npx playwright test";

/**
 * Run the tests with proper server setup
 */
async function runTests() {
  try {
    // Start the server if it's not already running
    const serverStarted = await startServer(SERVER_START_COMMAND, SERVER_URL);

    if (!serverStarted) {
      console.error("Failed to start the server. Exiting...");
      process.exit(1);
    }

    // Get additional arguments
    const args = process.argv.slice(2);

    // Check if there are additional arguments after '--'
    const dashIndex = args.indexOf("--");
    const testArgs = dashIndex >= 0 ? args.slice(dashIndex + 1) : args;

    // Run the tests with any additional arguments
    console.log(`Running tests with args: ${testArgs.join(" ")}`);
    const testProcess = spawn(TEST_COMMAND, testArgs, {
      stdio: "inherit",
      shell: true,
    });

    // Wait for the tests to complete
    testProcess.on("close", (code) => {
      console.log(`Tests completed with exit code ${code}`);
      process.exit(code);
    });
  } catch (error) {
    console.error("Error running tests:", error);
    process.exit(1);
  }
}

// Run the tests
runTests();
