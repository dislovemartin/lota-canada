import { expect, test } from "@playwright/test";

// Desktop tests
test.use({ viewport: { width: 1280, height: 800 } });

test("Desktop - homepage should render correctly", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check that the page is visible
  expect(await page.locator("body").isVisible()).toBeTruthy();

  // Take a screenshot for visual verification
  await page.screenshot({ path: "screenshots/desktop-homepage.png" });
});

test("Desktop - navigation should be fully visible", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check for navigation
  const navigation = page.locator("nav");
  expect(await navigation.count()).toBeGreaterThan(0);
  expect(await navigation.first().isVisible()).toBeTruthy();

  // On desktop, navigation links should be visible (not in a hamburger menu)
  const navLinks = navigation.first().locator("a");
  expect(await navLinks.count()).toBeGreaterThan(0);
  expect(await navLinks.first().isVisible()).toBeTruthy();
});
