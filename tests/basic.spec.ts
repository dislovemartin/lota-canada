import { expect, test } from "@playwright/test";

test.describe("Basic Tests", () => {
  test("homepage should load successfully", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check if the page title is correct
    const title = await page.title();
    expect(title).toBeTruthy();

    // Take a screenshot for visual verification
    await page.screenshot({ path: "homepage.png" });

    // Check if the page has content
    const bodyContent = await page.locator("body").textContent();
    expect(bodyContent).toBeTruthy();
    expect(bodyContent?.length).toBeGreaterThan(0);
  });

  test("should have basic HTML structure", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Check for basic HTML elements
    const hasHeader = await page.locator("header").count();
    const hasMain = await page.locator("main").count();
    const hasFooter = await page.locator("footer").count();

    // We expect at least one of these structural elements to exist
    expect(hasHeader + hasMain + hasFooter).toBeGreaterThan(0);
  });
});
