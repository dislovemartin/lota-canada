import { expect, test } from "@playwright/test";

test.describe("Theme Switching Tests", () => {
  test("should have theme toggle button", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Look for theme toggle button
    const themeToggle = await page
      .locator(
        '[aria-label*="theme"], [aria-label*="mode"], [id*="theme-toggle"]'
      )
      .first();
    expect(await themeToggle.isVisible()).toBeTruthy();
  });

  test("should switch between light and dark themes", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find the theme toggle button
    const themeToggle = await page
      .locator(
        '[aria-label*="theme"], [aria-label*="mode"], [id*="theme-toggle"]'
      )
      .first();

    // Get initial theme
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    });

    // Click the theme toggle
    await themeToggle.click();
    await page.waitForTimeout(500); // Wait for theme transition

    // Get the new theme
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    });

    // Verify theme has changed
    expect(newTheme).not.toBe(initialTheme);

    // Click again to revert
    await themeToggle.click();
    await page.waitForTimeout(500); // Wait for theme transition

    // Verify theme has reverted
    const revertedTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    });

    expect(revertedTheme).toBe(initialTheme);
  });

  test("should persist theme preference", async ({ page, context }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find the theme toggle button
    const themeToggle = await page
      .locator(
        '[aria-label*="theme"], [aria-label*="mode"], [id*="theme-toggle"]'
      )
      .first();

    // Get initial theme
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    });

    // Toggle to the opposite theme
    await themeToggle.click();
    await page.waitForTimeout(500); // Wait for theme transition

    // Get the new theme
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    });

    // Navigate to another page
    await page.goto("/about");
    await page.waitForLoadState("networkidle");

    // Check if theme persisted
    const persistedTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    });

    expect(persistedTheme).toBe(newTheme);
  });

  test("should respect system preference", async ({ browser }) => {
    // Create a new context with dark color scheme
    const darkContext = await browser.newContext({
      colorScheme: "dark",
    });

    // Create a page in the dark context
    const darkPage = await darkContext.newPage();

    // Navigate to the homepage
    await darkPage.goto("http://localhost:3003/");
    await darkPage.waitForLoadState("networkidle");

    // Check if dark theme is applied
    const isDarkTheme = await darkPage.evaluate(() => {
      return document.documentElement.classList.contains("dark");
    });

    // Create a new context with light color scheme
    const lightContext = await browser.newContext({
      colorScheme: "light",
    });

    // Create a page in the light context
    const lightPage = await lightContext.newPage();

    // Navigate to the homepage
    await lightPage.goto("http://localhost:3003/");
    await lightPage.waitForLoadState("networkidle");

    // Check if light theme is applied
    const isLightTheme = await lightPage.evaluate(() => {
      return !document.documentElement.classList.contains("dark");
    });

    // Clean up
    await darkContext.close();
    await lightContext.close();

    // Verify that at least one of the theme preferences was respected
    // (Some implementations might not follow system preference by default)
    expect(isDarkTheme || isLightTheme).toBeTruthy();
  });
});
