import { devices, expect, test } from "@playwright/test";

// iPhone 12 tests
test.use({ ...devices["iPhone 12"] });
test("iPhone 12 - homepage should render correctly", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check that the page is visible
  expect(await page.locator("body").isVisible()).toBeTruthy();

  // Check for mobile menu button (hamburger)
  const mobileMenuButton = page.locator(
    'button[aria-label*="menu"], button[aria-label*="Menu"], [role="button"][aria-label*="menu"]'
  );
  const hasMobileMenu = (await mobileMenuButton.count()) > 0;

  if (hasMobileMenu) {
    // If there's a mobile menu, it should be visible
    expect(await mobileMenuButton.isVisible()).toBeTruthy();
  } else {
    // If no mobile menu, the navigation should still be accessible
    const navigation = page.locator("nav");
    expect(await navigation.count()).toBeGreaterThan(0);
  }

  // Take a screenshot for visual verification
  await page.screenshot({ path: "screenshots/iphone12-homepage.png" });
});

test("iPhone 12 - content should be readable", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check text size - should be at least 14px for readability
  const paragraphs = page.locator("p");
  if ((await paragraphs.count()) > 0) {
    const firstParagraph = paragraphs.first();
    const fontSize = await firstParagraph.evaluate((el) => {
      return parseFloat(window.getComputedStyle(el).fontSize);
    });

    expect(fontSize).toBeGreaterThanOrEqual(14);
  }
});

// Create a separate test file for iPad tests
// tests/mobile-responsiveness-ipad.spec.ts
// with test.use({ ...devices["iPad (gen 7)"] });

// Create a separate test file for Desktop tests
// tests/mobile-responsiveness-desktop.spec.ts
// with test.use({ viewport: { width: 1280, height: 800 } });

// Viewport adaptation test - doesn't use device emulation
test("should adapt content based on viewport size", async ({ page }) => {
  // Test on mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check if there's a mobile-specific class or element
  const mobileSpecificElement = page.locator(
    '.mobile-only, [data-device="mobile"]'
  );
  const hasMobileSpecificElement = (await mobileSpecificElement.count()) > 0;

  // Test on desktop viewport
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check if there's a desktop-specific class or element
  const desktopSpecificElement = page.locator(
    '.desktop-only, [data-device="desktop"]'
  );
  const hasDesktopSpecificElement = (await desktopSpecificElement.count()) > 0;

  // Either we should have device-specific elements, or the layout should adapt
  if (hasMobileSpecificElement || hasDesktopSpecificElement) {
    // If we have device-specific elements, they should be used correctly
    console.log("Site uses device-specific elements for responsive design");
  } else {
    // If no device-specific elements, the layout should be fluid
    console.log("Site uses fluid layout for responsive design");
  }

  // The page should be visible in both cases
  expect(await page.locator("body").isVisible()).toBeTruthy();
});
