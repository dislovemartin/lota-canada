const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        table(message) {
          console.table(message)
          return null
        }
      })
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    // Configure cypress-axe for accessibility testing
    axe: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
    },
  },
  // Define different viewports for responsive testing
  viewports: [
    { width: 375, height: 667, name: 'mobile' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 1280, height: 800, name: 'desktop' },
    { width: 1920, height: 1080, name: 'large desktop' },
  ],
  // Network conditions for performance testing
  networkConditions: [
    { name: 'Fast 3G', downloadSpeed: 1.5 * 1024 * 1024 / 8, uploadSpeed: 750 * 1024 / 8, latency: 40 },
    { name: 'Slow 3G', downloadSpeed: 500 * 1024 / 8, uploadSpeed: 250 * 1024 / 8, latency: 300 },
  ],
}) 