import { expect, test } from "@playwright/test";

test.describe("Accessibility tests", () => {
  test("homepage should have proper accessibility structure", async ({
    page,
  }) => {
    // Navigate to the homepage
    await page.goto("/");

    // Wait for the page to be fully loaded
    await page.waitForLoadState("networkidle");

    // Basic accessibility checks that don't rely on the full snapshot

    // 1. Check for page title
    const title = await page.title();
    expect(title).toBeTruthy();

    // 2. Check for heading structure
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    expect(headings.length).toBeGreaterThan(0);

    // 3. Check for alt text on images
    const images = await page.locator("img").all();
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      // Either alt text should exist or role="presentation" should be set
      const role = await img.getAttribute("role");
      expect(alt !== null || role === "presentation").toBeTruthy();
    }

    // 4. Check for proper button accessibility
    const buttons = await page.locator("button").all();
    for (const button of buttons) {
      // Buttons should have either text content, aria-label, or aria-labelledby
      const textContent = await button.textContent();
      const ariaLabel = await button.getAttribute("aria-label");
      const ariaLabelledby = await button.getAttribute("aria-labelledby");

      expect(
        textContent?.trim() !== "" ||
          ariaLabel !== null ||
          ariaLabelledby !== null
      ).toBeTruthy();
    }

    // 5. Check for proper form field labeling
    const formFields = await page.locator("input, select, textarea").all();
    for (const field of formFields) {
      const id = await field.getAttribute("id");
      if (id) {
        // If the field has an ID, there should be a label for it
        const label = await page.locator(`label[for="${id}"]`).count();
        const ariaLabelledby = await field.getAttribute("aria-labelledby");
        const ariaLabel = await field.getAttribute("aria-label");

        expect(
          label > 0 || ariaLabelledby !== null || ariaLabel !== null
        ).toBeTruthy();
      }
    }
  });
});
