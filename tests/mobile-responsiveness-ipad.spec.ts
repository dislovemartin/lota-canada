import { devices, expect, test } from "@playwright/test";

// iPad tests
test.use({ ...devices["iPad (gen 7)"] });

test("iPad - homepage should render correctly", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check that the page is visible
  expect(await page.locator("body").isVisible()).toBeTruthy();

  // Take a screenshot for visual verification
  await page.screenshot({ path: "screenshots/ipad-homepage.png" });
});

test("iPad - navigation should be accessible", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  // Check for navigation
  const navigation = page.locator("nav");
  expect(await navigation.count()).toBeGreaterThan(0);

  // On iPad, navigation might be in a hamburger menu
  const mobileMenuButton = page.locator(
    'button[aria-label*="menu"], button[aria-label*="Menu"], [role="button"][aria-label*="menu"]'
  );
  const hasMobileMenu = (await mobileMenuButton.count()) > 0;

  if (hasMobileMenu) {
    // If there's a mobile menu button, it should be visible
    expect(await mobileMenuButton.isVisible()).toBeTruthy();

    // Try clicking the menu button to see if navigation appears
    await mobileMenuButton.click();
    await page.waitForTimeout(500); // Wait for animation

    // After clicking, either the nav should be visible or some menu items should appear
    const menuItems = page.locator(
      'nav a, [role="menu"] a, .menu a, .dropdown a'
    );
    const visibleMenuItems = await menuItems.filter({ hasText: /.+/ }).count();

    console.log(
      `Found ${visibleMenuItems} visible menu items after clicking menu button`
    );
  } else {
    // If no mobile menu, the navigation should be directly visible
    expect(await navigation.isVisible()).toBeTruthy();
  }
});
