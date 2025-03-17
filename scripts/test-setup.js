const { spawn } = require("child_process");
const http = require("http");
const { promisify } = require("util");
const sleep = promisify(setTimeout);

// Maximum number of attempts to check if the server is running
const MAX_ATTEMPTS = 30;
// Delay between attempts in milliseconds
const DELAY_BETWEEN_ATTEMPTS = 2000;

/**
 * Check if the server is running by making an HTTP request
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>} - Whether the server is running
 */
async function isServerRunning(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        resolve(res.statusCode === 200);
      })
      .on("error", () => {
        resolve(false);
      });
  });
}

/**
 * Wait for the server to be running
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>} - Whether the server is running
 */
async function waitForServer(url) {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    console.log(
      `Checking if server is running (attempt ${i + 1}/${MAX_ATTEMPTS})...`
    );

    if (await isServerRunning(url)) {
      console.log("Server is running!");
      return true;
    }

    await sleep(DELAY_BETWEEN_ATTEMPTS);
  }

  console.error("Server failed to start within the timeout period");
  return false;
}

/**
 * Start the server and wait for it to be running
 * @param {string} command - The command to start the server
 * @param {string} url - The URL to check
 * @returns {Promise<boolean>} - Whether the server is running
 */
async function startServer(command, url) {
  // Check if server is already running
  if (await isServerRunning(url)) {
    console.log("Server is already running");
    return true;
  }

  // Start the server
  console.log(`Starting server with command: ${command}`);
  const [cmd, ...args] = command.split(" ");
  const server = spawn(cmd, args, {
    stdio: "inherit",
    shell: true,
    detached: true,
  });

  // Wait for the server to be running
  const isRunning = await waitForServer(url);

  if (!isRunning) {
    // Kill the server process if it failed to start
    process.kill(-server.pid);
    return false;
  }

  return true;
}

module.exports = {
  startServer,
  waitForServer,
  isServerRunning,
};
