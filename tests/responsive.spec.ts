import { expect, test } from "@playwright/test";

// Define viewport sizes to test
const viewports = [
  { width: 375, height: 667, name: "Mobile" },
  { width: 768, height: 1024, name: "Tablet" },
  { width: 1280, height: 800, name: "Desktop" },
  { width: 1920, height: 1080, name: "Large Desktop" },
];

test.describe("Responsive Design Tests", () => {
  for (const viewport of viewports) {
    test(`homepage should render correctly on ${viewport.name}`, async ({
      page,
    }) => {
      // Set viewport size
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Navigate to the homepage
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Take a screenshot for visual verification
      await page.screenshot({
        path: `homepage-${viewport.name.toLowerCase().replace(" ", "-")}.png`,
      });

      // Check if the page has content
      const bodyContent = await page.locator("body").textContent();
      expect(bodyContent).toBeTruthy();
      expect(bodyContent?.length).toBeGreaterThan(0);

      // Check for mobile menu button on smaller viewports
      if (viewport.width < 768) {
        const mobileMenuButton = await page
          .locator(
            '[aria-label*="menu"], [aria-label*="navigation"], button[class*="hamburger"]'
          )
          .first();
        expect(await mobileMenuButton.isVisible()).toBeTruthy();

        // Click the mobile menu button
        await mobileMenuButton.click();

        // Wait for the menu to open
        await page.waitForTimeout(500);

        // Check if the menu is visible
        const mobileMenu = await page
          .locator('nav, [role="navigation"]')
          .first();
        expect(await mobileMenu.isVisible()).toBeTruthy();
      } else {
        // On larger viewports, navigation should be visible by default
        const desktopNav = await page
          .locator('nav, [role="navigation"]')
          .first();
        expect(await desktopNav.isVisible()).toBeTruthy();
      }
    });

    test(`contact page should be responsive on ${viewport.name}`, async ({
      page,
    }) => {
      // Set viewport size
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Navigate to the contact page
      await page.goto("/contact");
      await page.waitForLoadState("networkidle");

      // Take a screenshot for visual verification
      await page.screenshot({
        path: `contact-${viewport.name.toLowerCase().replace(" ", "-")}.png`,
      });

      // Check if the form is visible
      const contactForm = await page.locator("form").first();
      expect(await contactForm.isVisible()).toBeTruthy();

      // Check if form elements are properly sized for the viewport
      const formInputs = await contactForm
        .locator("input, textarea, button")
        .all();

      for (const input of formInputs) {
        // Get the bounding box of the input
        const boundingBox = await input.boundingBox();

        // Ensure the input is not wider than the viewport
        expect(boundingBox?.width).toBeLessThanOrEqual(viewport.width);

        // Ensure the input is visible within the viewport
        expect(boundingBox?.x).toBeGreaterThanOrEqual(0);
        expect(boundingBox?.x + boundingBox?.width).toBeLessThanOrEqual(
          viewport.width
        );
      }
    });
  }

  test("should have proper meta viewport tag", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Check for viewport meta tag
    const viewportMeta = await page.locator('meta[name="viewport"]').first();
    const content = await viewportMeta.getAttribute("content");

    // Should have width=device-width and initial-scale
    expect(content).toContain("width=device-width");
    expect(content).toContain("initial-scale=");
  });

  test("should use responsive images", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check for responsive image techniques
    const responsiveImages = await page
      .locator(
        "img[srcset], img[sizes], picture source[srcset], picture source[media]"
      )
      .count();

    // If there are images on the page, at least some should be responsive
    const totalImages = await page.locator("img, picture source").count();

    if (totalImages > 0) {
      expect(responsiveImages).toBeGreaterThan(0);
    } else {
      test.skip();
    }
  });
});
