# Testing Guide

This document provides instructions on how to run the tests for the Lota Canada project.

## Playwright Tests

Playwright is used for end-to-end testing of the application. The tests are located in the `tests` directory.

### Running Tests

There are several ways to run the Playwright tests:

#### Standard Test Commands

```bash
# Run all tests
npm run test:playwright

# Run a specific test file
npm run test:playwright -- tests/basic.spec.ts

# Run tests with UI mode for debugging
npm run test:playwright:ui

# Run tests in debug mode
npm run test:playwright:debug

# View the HTML report of the last test run
npm run test:playwright:report
```

#### Reliable Test Commands

These commands ensure that the development server is running before executing the tests:

```bash
# Run all tests with reliable server setup
npm run test:playwright:reliable

# Run tests with UI mode for debugging
npm run test:playwright:reliable:ui

# Run tests in debug mode
npm run test:playwright:reliable:debug
```

### Checking Server Status

You can check if the development server is running with:

```bash
npm run test:check-server
```

## Test Files

The test suite includes the following test files:

### Basic Tests (`basic.spec.ts`)

- Tests basic functionality of the website
- Verifies that pages load correctly
- Checks for basic HTML structure

### Accessibility Tests (`accessibility.spec.ts`)

- Tests for accessibility compliance
- Checks for proper heading structure
- Verifies image alt text
- Ensures form fields are properly labeled

### Navigation Tests (`navigation.spec.ts`)

- Tests navigation links and routing
- Verifies that links are clickable
- Measures performance metrics during navigation

### Component Tests (`components.spec.ts`)

- Tests individual UI components
- Verifies that components render correctly
- Checks for expected content and functionality

### Form Tests (`forms.spec.ts`)

- Tests form validation and submission
- Verifies that required fields are validated
- Checks for proper error messages
- Tests successful form submission

### Theme Tests (`theme.spec.ts`)

- Tests theme switching functionality
- Verifies light and dark mode
- Checks theme persistence across pages
- Tests system preference detection

### API Tests (`api.spec.ts`)

- Tests API endpoints
- Verifies proper response formats
- Tests input validation
- Checks error handling

### Performance Tests (`performance.spec.ts`)

- Tests website performance
- Measures load times
- Checks Core Web Vitals metrics (LCP, CLS, FID)
- Verifies image optimization

### Responsive Tests (`responsive.spec.ts`)

- Tests responsive design across different viewport sizes
- Verifies mobile menu functionality
- Checks that elements scale properly
- Tests responsive images

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

## Best Practices for Writing Tests

1. **Make tests independent**: Each test should be able to run independently of other tests.
2. **Use descriptive test names**: Test names should clearly describe what is being tested.
3. **Wait for elements properly**: Use `waitForSelector` or `waitForLoadState` to ensure elements are ready.
4. **Handle async operations**: Use `async/await` for all asynchronous operations.
5. **Use page objects**: For complex applications, consider using the page object pattern.
6. **Test for accessibility**: Include tests for accessibility compliance.
7. **Test responsive design**: Test on multiple viewport sizes.
8. **Test performance**: Include tests for performance metrics.
9. **Use test data**: Create test data that is isolated from production data.
10. **Clean up after tests**: If tests create data, make sure to clean it up afterward.
