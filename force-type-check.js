const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Backup the original next.config.mjs
const nextConfigPath = path.join(__dirname, 'next.config.mjs');
const backupPath = path.join(__dirname, 'next.config.mjs.bak');

fs.copyFileSync(nextConfigPath, backupPath);

// Read the current config
let config = fs.readFileSync(nextConfigPath, 'utf8');

// Ensure TypeScript and ESLint checks are enabled
config = config.replace(
  /typescript:\s*{[^}]*}/,
  'typescript: { ignoreBuildErrors: false }'
);
config = config.replace(
  /eslint:\s*{[^}]*}/,
  'eslint: { ignoreDuringBuilds: false, dirs: ["app", "components", "lib", "hooks"] }'
);

// Write the modified config
fs.writeFileSync(nextConfigPath, config);

try {
  // Run TypeScript type checking separately
  console.log('Running TypeScript type checking...');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('TypeScript type checking passed!');
  } catch (error) {
    console.error('TypeScript type checking failed!');
    process.exit(1);
  }

  // Run the build
  console.log('Running build with TypeScript checks enabled...');
  execSync('NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=4096 next build', { stdio: 'inherit' });
} finally {
  // Restore the original config
  fs.copyFileSync(backupPath, nextConfigPath);
  fs.unlinkSync(backupPath);
}
