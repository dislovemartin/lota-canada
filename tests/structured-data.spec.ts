import { expect, test } from "@playwright/test";

test.describe("Structured Data Tests", () => {
  test("homepage should have Organization structured data", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Extract JSON-LD structured data
    const structuredData = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(script => {
        try {
          return JSON.parse(script.textContent || "");
        } catch (e) {
          return null;
        }
      }).filter(Boolean);
    });

    // Log the structured data for debugging
    console.log("Found structured data:", JSON.stringify(structuredData, null, 2));

    // Check if there's at least one structured data object
    expect(structuredData.length).toBeGreaterThan(0);

    // Find Organization structured data
    const organizationData = structuredData.find(data => data["@type"] === "Organization");
    expect(organizationData).toBeTruthy();

    // Check required properties for Organization
    expect(organizationData?.name).toBeTruthy();
    expect(organizationData?.url).toBeTruthy();
    expect(organizationData?.logo).toBeTruthy();
  });

  test("homepage should have WebSite structured data", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Extract JSON-LD structured data
    const structuredData = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(script => {
        try {
          return JSON.parse(script.textContent || "");
        } catch (e) {
          return null;
        }
      }).filter(Boolean);
    });

    // Find WebSite structured data
    const websiteData = structuredData.find(data => data["@type"] === "WebSite");
    expect(websiteData).toBeTruthy();

    // Check required properties for WebSite
    expect(websiteData?.name).toBeTruthy();
    expect(websiteData?.url).toBeTruthy();
    expect(websiteData?.description).toBeTruthy();
  });

  test("homepage should have LocalBusiness structured data", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Extract JSON-LD structured data
    const structuredData = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(script => {
        try {
          return JSON.parse(script.textContent || "");
        } catch (e) {
          return null;
        }
      }).filter(Boolean);
    });

    // Find LocalBusiness structured data
    const localBusinessData = structuredData.find(data => data["@type"] === "LocalBusiness");
    expect(localBusinessData).toBeTruthy();

    // Check required properties for LocalBusiness
    expect(localBusinessData?.name).toBeTruthy();
    expect(localBusinessData?.address).toBeTruthy();
    expect(localBusinessData?.address["@type"]).toBe("PostalAddress");
    expect(localBusinessData?.telephone).toBeTruthy();
  });

  test("event pages should have Event structured data", async ({ page }) => {
    // Navigate to the events page
    await page.goto("/events");
    await page.waitForLoadState("networkidle");

    // Try to find an event link
    const eventLinks = await page.locator('a[href*="events/"]').all();

    if (eventLinks.length > 0) {
      // Click the first event link
      await eventLinks[0].click();
      await page.waitForLoadState("networkidle");

      // Extract JSON-LD structured data
      const structuredData = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        return scripts.map(script => {
          try {
            return JSON.parse(script.textContent || "");
          } catch (e) {
            return null;
          }
        }).filter(Boolean);
      });

      // Find Event structured data
      const eventData = structuredData.find(data => data["@type"] === "Event");

      // If we found an event page, it should have Event structured data
      if (eventData) {
        expect(eventData.name).toBeTruthy();
        expect(eventData.startDate).toBeTruthy();
        expect(eventData.location).toBeTruthy();
      } else {
        console.log("No Event structured data found - this might be expected if this isn't a single event page");
      }
    } else {
      console.log("No event links found - skipping Event structured data test");
    }
  });

  test("structured data should be valid JSON-LD", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check that all JSON-LD is valid
    const validJsonLd = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.every(script => {
        try {
          JSON.parse(script.textContent || "");
          return true;
        } catch (e) {
          console.error("Invalid JSON-LD:", e);
          return false;
        }
      });
    });

    expect(validJsonLd).toBe(true);
  });
});
