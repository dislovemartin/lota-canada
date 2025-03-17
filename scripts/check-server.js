const { isServerRunning } = require("./test-setup");

// Configuration
const SERVER_URL = "http://localhost:3003";

/**
 * Check if the server is running and exit with appropriate code
 */
async function checkServer() {
  try {
    console.log(`Checking if server is running at ${SERVER_URL}...`);
    const running = await isServerRunning(SERVER_URL);

    if (running) {
      console.log("Server is running!");
      process.exit(0);
    } else {
      console.error("Server is not running!");
      console.error("Please start the server with: npm run dev -- -p 3003");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error checking server:", error);
    process.exit(1);
  }
}

// Check if the server is running
checkServer();
