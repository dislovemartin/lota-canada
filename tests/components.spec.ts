import { expect, test } from "@playwright/test";

test.describe("Component Rendering Tests", () => {
  test("header should render correctly", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check if header exists
    const header = await page.locator("header").first();
    expect(await header.isVisible()).toBeTruthy();

    // Check for navigation links
    const navLinks = await header.locator("a").all();
    expect(navLinks.length).toBeGreaterThan(0);

    // Check for logo
    const logo = await header.locator("img, svg").first();
    expect(await logo.isVisible()).toBeTruthy();
  });

  test("footer should render correctly", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check if footer exists
    const footer = await page.locator("footer").first();
    expect(await footer.isVisible()).toBeTruthy();

    // Check for copyright information
    const copyrightText = await footer.textContent();
    expect(copyrightText).toContain("©");

    // Check for social media links
    const socialLinks = await footer
      .locator(
        'a[href*="twitter"], a[href*="facebook"], a[href*="linkedin"], a[href*="instagram"]'
      )
      .all();
    expect(socialLinks.length).toBeGreaterThan(0);
  });

  test("hero section should render correctly", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check if hero section exists (could be different selectors based on your implementation)
    const heroSection = await page
      .locator('section:first-of-type, [class*="hero"], [id*="hero"]')
      .first();
    expect(await heroSection.isVisible()).toBeTruthy();

    // Check for heading
    const heading = await heroSection.locator("h1, h2").first();
    expect(await heading.isVisible()).toBeTruthy();
    expect(await heading.textContent()).toBeTruthy();

    // Check for call-to-action button
    const ctaButton = await heroSection.locator("a[href], button").first();
    expect(await ctaButton.isVisible()).toBeTruthy();
  });

  test("announcement component should render if present", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check if announcement component exists
    const announcement = await page
      .locator('[class*="announcement"], [id*="announcement"], [role="alert"]')
      .first();

    // If announcement exists, verify its content
    if ((await announcement.count()) > 0) {
      expect(await announcement.isVisible()).toBeTruthy();

      // Get the text content
      const content = await announcement.textContent();

      // Log the content for debugging
      console.log(`Announcement content: "${content}"`);

      // We don't fail the test if the content is empty
      if (!content || content.trim() === "") {
        console.log(
          "No announcement component found - this is not necessarily an error"
        );
      }
    } else {
      console.log(
        "No announcement component found - this is not necessarily an error"
      );
    }
  });

  test("testimonials should render correctly if present", async ({ page }) => {
    // Navigate to the homepage or testimonials page
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check if testimonials section exists
    const testimonials = await page
      .locator('[class*="testimonial"], [id*="testimonial"]')
      .first();

    // If testimonials exist, verify their content
    if ((await testimonials.count()) > 0) {
      expect(await testimonials.isVisible()).toBeTruthy();

      // Check for testimonial content
      const testimonialItems = await testimonials
        .locator('[class*="testimonial-item"], blockquote, [class*="quote"]')
        .all();
      if (testimonialItems.length > 0) {
        // Verify at least one testimonial has content
        const firstTestimonial = testimonialItems[0];
        expect(await firstTestimonial.textContent()).toBeTruthy();
      }
    } else {
      console.log(
        "No testimonials found on this page - this is not necessarily an error"
      );
    }
  });
});
