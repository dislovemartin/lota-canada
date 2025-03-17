# Lota Canada Test Suite

This directory contains end-to-end tests for the Lota Canada website using Playwright.

## Test Files

- `accessibility.spec.ts`: Tests for accessibility compliance
- `api.spec.ts`: Tests for API endpoints
- `basic.spec.ts`: Basic functionality tests
- `components.spec.ts`: Tests for component rendering
- `forms.spec.ts`: Tests for form validation
- `home.spec.ts`: Tests for the homepage
- `navigation.spec.ts`: Tests for navigation and routing
- `performance.spec.ts`: Tests for performance metrics
- `responsive.spec.ts`: Tests for responsive design
- `theme.spec.ts`: Tests for theme switching

## Running Tests

You can run the tests using the following commands:

```bash
# Run all tests
npm run test:playwright:reliable

# Run a specific test file
npm run test:playwright:reliable -- tests/basic.spec.ts

# Run tests with UI mode for debugging
npm run test:playwright:reliable:ui

# Run tests in debug mode
npm run test:playwright:reliable:debug
```

## Test Categories

### Accessibility Tests

Tests to ensure the website meets accessibility standards, including proper heading structure, image alt text, and form labeling.

### API Tests

Tests for API endpoints, including validation of inputs, proper error handling, and expected responses.

### Basic Tests

Fundamental tests to ensure the website loads correctly and has the expected structure.

### Component Tests

Tests for individual components to ensure they render correctly and function as expected.

### Form Tests

Tests for form validation, submission, and error handling.

### Navigation Tests

Tests for navigation links, routing, and page transitions.

### Performance Tests

Tests for performance metrics like load time, Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and First Input Delay (FID).

### Responsive Tests

Tests for responsive design across different viewport sizes, including mobile menu functionality and proper scaling of elements.

### Theme Tests

Tests for theme switching functionality, including light/dark mode and persistence of theme preferences.

## Adding New Tests

When adding new tests, follow these guidelines:

1. Create a new file in the `tests` directory with the `.spec.ts` extension
2. Import the necessary Playwright test utilities
3. Use the `test.describe` and `test` functions to organize your tests
4. Make sure to navigate to the appropriate page and wait for it to load
5. Add assertions to verify the expected behavior

Example:

```typescript
import { expect, test } from "@playwright/test";

test.describe("My New Tests", () => {
  test("should do something", async ({ page }) => {
    // Navigate to the page
    await page.goto("/my-page");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Add assertions
    expect(await page.title()).toBe("My Page");
  });
});
```

## Troubleshooting

If you encounter issues with the tests, try the following:

1. Make sure the development server is running on port 3003:

   ```bash
   npm run dev -- -p 3003
   ```

2. Check if the server is accessible:

   ```bash
   npm run test:check-server
   ```

3. Use the reliable test commands which automatically start the server if needed:

   ```bash
   npm run test:playwright:reliable
   ```

4. If tests are still failing, try running in debug mode to see more details:
   ```bash
   npm run test:playwright:reliable:debug
   ```

## Test Configuration

The Playwright configuration is in `playwright.config.ts` at the root of the project. Key settings include:

- Tests run against a local development server on port 3003
- Tests run in parallel by default
- Tests run on multiple browsers (Chromium, Firefox, WebKit) and device viewports
- Screenshots are captured on test failures

## Best Practices

- Keep tests independent of each other
- Use descriptive test names that explain what is being tested
- Wait for elements to be visible before interacting with them
- Use `page.waitForLoadState()` to ensure the page is fully loaded
- Use `page.waitForSelector()` to wait for specific elements
- Use `expect()` assertions to verify expected behavior
- Add comments to explain complex test logic

## Maintenance

As the application evolves:

1. Update selectors if the HTML structure changes
2. Add new tests for new features
3. Update existing tests to reflect changes in functionality
4. Remove tests for deprecated features
