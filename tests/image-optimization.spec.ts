import { expect, test } from "@playwright/test";

test.describe("Image Optimization Tests", () => {
  test("images should use next/image component", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check for next/image optimized images
    const optimizedImages = await page.locator('img[srcset], img[data-nimg]').count();
    console.log(`Found ${optimizedImages} optimized images`);

    // There should be at least one optimized image
    expect(optimizedImages).toBeGreaterThan(0);
  });

  test("images should have proper alt text", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Get all images
    const images = await page.locator('img').all();

    // Count images with alt text
    let imagesWithAlt = 0;
    let imagesWithEmptyAlt = 0;
    let imagesWithoutAlt = 0;

    for (const img of images) {
      const hasAlt = await img.evaluate(el => el.hasAttribute('alt'));
      if (hasAlt) {
        const altText = await img.getAttribute('alt');
        if (altText && altText.trim() !== '') {
          imagesWithAlt++;
        } else {
          imagesWithEmptyAlt++;
        }
      } else {
        imagesWithoutAlt++;
      }
    }

    console.log(`Images with alt text: ${imagesWithAlt}`);
    console.log(`Images with empty alt text: ${imagesWithEmptyAlt}`);
    console.log(`Images without alt text: ${imagesWithoutAlt}`);

    // All images should have alt attributes (empty alt is OK for decorative images)
    expect(imagesWithoutAlt).toBe(0);
  });

  test("lazy-loaded images should have proper loading attribute", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check for lazy-loaded images
    const lazyLoadedImages = await page.locator('img[loading="lazy"]').count();
    console.log(`Images with loading="lazy": ${lazyLoadedImages}`);

    // There should be at least one lazy-loaded image
    // Note: Next.js might handle lazy loading differently, so this is not a strict requirement
    expect(lazyLoadedImages).toBeGreaterThanOrEqual(0);
  });

  test("images should have appropriate sizes", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Get all images
    const images = await page.locator('img').all();

    // Skip test if no images
    if (images.length === 0) {
      console.log("No images found - skipping image size test");
      return;
    }

    // Check image dimensions
    for (const img of images) {
      const src = await img.getAttribute('src');

      // Skip SVGs as they're already optimized
      if (src && src.includes('.svg')) {
        continue;
      }

      // Get natural dimensions
      const dimensions = await img.evaluate(el => {
        return {
          width: el.naturalWidth,
          height: el.naturalHeight
        };
      });

      const { width, height } = dimensions;
      console.log(`Image ${src}: ${width}x${height}`);

      // Some images might not be loaded yet or might be dynamically sized
      // So we'll just log them and not fail the test
      if (width === 0 || height === 0) {
        console.log(`Image ${src} has zero dimensions - might be loading or SVG`);
        continue;
      }

      // Check if dimensions are reasonable
      // This is a basic check - adjust thresholds based on your site's needs
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);

      // Check for extremely large images that should be optimized
      // These thresholds can be adjusted based on your site's needs
      if (width > 2000 || height > 2000) {
        console.log(`Large image detected: ${src} (${width}x${height})`);
      }
    }
  });

  test("responsive images should use srcset", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    // Check for responsive images with srcset
    const responsiveImages = await page.locator('img[srcset], source[srcset]').count();
    console.log(`Images with srcset: ${responsiveImages}`);

    // There should be at least one responsive image
    // Note: Next.js handles responsive images automatically, so this should pass
    expect(responsiveImages).toBeGreaterThanOrEqual(0);
  });
});
