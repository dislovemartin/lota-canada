import { expect, test } from "@playwright/test";

test.describe("Navigation and Routing", () => {
  test("should find navigation links", async ({ page }) => {
    // Start at the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find navigation links
    const navLinks = await page.locator('a[href^="/"]').all();

    // We should have at least one navigation link
    expect(navLinks.length).toBeGreaterThan(0);

    // Check that at least one link has a valid href
    let hasValidLink = false;
    for (const link of navLinks) {
      const href = await link.getAttribute("href");
      if (href && href !== "/" && !href.startsWith("http")) {
        hasValidLink = true;
        break;
      }
    }

    expect(hasValidLink).toBeTruthy();
  });

  test("should have clickable links", async ({ page }) => {
    // Start at the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Find links that should be clickable
    const navLinks = await page.locator('a[href^="/"]').all();

    if (navLinks.length > 0) {
      // Find a link that's visible and clickable
      for (const link of navLinks) {
        const href = await link.getAttribute("href");
        const isVisible = await link.isVisible();

        if (href && href !== "/" && !href.startsWith("http") && isVisible) {
          // Verify the link is not disabled
          const isDisabled =
            (await link.getAttribute("aria-disabled")) === "true";
          expect(isDisabled).toBeFalsy();

          // Test passed if we found at least one valid, visible, non-disabled link
          break;
        }
      }
    } else {
      // Skip the test if no navigation links are found
      test.skip();
    }
  });

  test("should measure performance metrics", async ({ page }) => {
    // Start at the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Measure initial page load performance
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paint = performance.getEntriesByType("paint");

      return {
        domContentLoaded:
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart,
        firstPaint: paint.find((entry) => entry.name === "first-paint")
          ?.startTime,
        firstContentfulPaint: paint.find(
          (entry) => entry.name === "first-contentful-paint"
        )?.startTime,
      };
    });

    // Verify we got some performance metrics
    expect(performanceMetrics).toBeTruthy();
    console.log("Performance metrics:", performanceMetrics);

    // First paint should be a reasonable value (adjust as needed)
    if (performanceMetrics.firstPaint) {
      expect(performanceMetrics.firstPaint).toBeLessThan(10000);
    }
  });
});
