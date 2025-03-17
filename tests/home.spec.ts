import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load the homepage successfully", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check if the page title is correct
    const title = await page.title();
    expect(title).toBeTruthy();

    // Take a screenshot for visual verification
    await page.screenshot({ path: "homepage.png" });
  });

  test("should have navigation elements", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Check if navigation elements exist
    const navElements = await page.locator("nav").count();
    expect(navElements).toBeGreaterThan(0);
  });
});
