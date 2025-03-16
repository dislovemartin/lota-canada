/**
 * Script to run system optimizations for inference
 * This script runs the system optimization script with root privileges.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Path to the optimization script
const scriptPath = path.join(__dirname, 'optimize-system-for-inference.sh');

// Make sure the script is executable
try {
  fs.chmodSync(scriptPath, '755');
  console.log('Made optimization script executable');
} catch (error) {
  console.error('Failed to make optimization script executable:', error);
  process.exit(1);
}

// Function to run the script with sudo
function runWithSudo() {
  console.log('Running system optimization script with sudo...');
  
  // Spawn sudo process
  const sudo = spawn('sudo', [scriptPath], {
    stdio: 'inherit'
  });
  
  // Handle process events
  sudo.on('close', (code) => {
    if (code === 0) {
      console.log('System optimization completed successfully');
    } else {
      console.error(`System optimization failed with code ${code}`);
    }
  });
  
  sudo.on('error', (error) => {
    console.error('Failed to run sudo:', error);
  });
}

// Function to check if user has sudo privileges
function checkSudoAccess() {
  console.log('Checking sudo access...');
  
  const sudo = spawn('sudo', ['-n', 'true']);
  
  sudo.on('close', (code) => {
    if (code === 0) {
      console.log('User has sudo access without password');
      runWithSudo();
    } else {
      console.log('User needs to enter sudo password');
      console.log('Please run the following command manually:');
      console.log(`sudo ${scriptPath}`);
    }
  });
}

// Main function
function main() {
  // Check if running on Linux or macOS
  if (process.platform !== 'linux' && process.platform !== 'darwin') {
    console.error('This script is only supported on Linux and macOS');
    process.exit(1);
  }
  
  // Check if the script exists
  if (!fs.existsSync(scriptPath)) {
    console.error(`Optimization script not found at ${scriptPath}`);
    process.exit(1);
  }
  
  // Check sudo access
  checkSudoAccess();
}

// Run main function
main(); 