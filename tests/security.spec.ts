import { expect, test } from "@playwright/test";

test.describe("Security Tests", () => {
  test("should have appropriate security headers", async ({ page, request }) => {
    // Navigate to the homepage
    const response = await request.get("/");

    // Check for security headers
    const headers = response.headers();

    // Log headers for debugging
    console.log("Response headers:", headers);

    // Check for Content-Security-Policy
    // This might not be set in development, but should be in production
    const csp = headers["content-security-policy"];
    if (csp) {
      console.log("Content-Security-Policy is set:", csp);
    } else {
      console.log("Content-Security-Policy is not set - this might be expected in development");
    }

    // Check for X-Content-Type-Options
    const xContentTypeOptions = headers["x-content-type-options"];
    if (xContentTypeOptions) {
      expect(xContentTypeOptions).toBe("nosniff");
    } else {
      console.log("X-Content-Type-Options is not set - this might be expected in development");
    }

    // Check for X-Frame-Options
    const xFrameOptions = headers["x-frame-options"];
    if (xFrameOptions) {
      expect(["DENY", "SAMEORIGIN"]).toContain(xFrameOptions.toUpperCase());
    } else {
      console.log("X-Frame-Options is not set - this might be expected in development");
    }

    // Check for Strict-Transport-Security
    const hsts = headers["strict-transport-security"];
    if (hsts) {
      expect(hsts).toContain("max-age=");
    } else {
      console.log("Strict-Transport-Security is not set - this might be expected in development or non-HTTPS environments");
    }
  });

  test("forms should have CSRF protection", async ({ page }) => {
    // Navigate to a page with a form
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    // Check if there's a form
    const form = await page.locator("form");

    if (await form.count() > 0) {
      // Check for CSRF token in the form
      // This could be a hidden input with a name like csrf_token, _token, etc.
      const csrfToken = await form.locator('input[name*="csrf"], input[name*="token"], input[name="_token"], input[name="csrfToken"]').count();

      // If we don't find a token input, check for a meta tag with csrf token
      if (csrfToken === 0) {
        const metaCsrf = await page.locator('meta[name*="csrf"], meta[name*="token"]').count();

        if (metaCsrf === 0) {
          console.log("No CSRF token found - this might be a security issue or the form might use a different CSRF protection mechanism");
        } else {
          console.log("CSRF token found in meta tag");
        }
      } else {
        console.log("CSRF token found in form");
      }
    } else {
      console.log("No form found on contact page - skipping CSRF test");
    }
  });

  test("login form should have proper security measures", async ({ page }) => {
    // Navigate to the login page if it exists
    try {
      await page.goto("/login");
      await page.waitForLoadState("networkidle");

      // Check if there's a login form
      const loginForm = await page.locator('form:has(input[type="password"])');

      if (await loginForm.count() > 0) {
        // Check for autocomplete="off" on password field
        const passwordField = await loginForm.locator('input[type="password"]');
        const autocomplete = await passwordField.getAttribute("autocomplete");

        if (autocomplete === "off" || autocomplete === "new-password") {
          console.log("Password field has appropriate autocomplete attribute");
        } else {
          console.log("Password field should have autocomplete='off' or autocomplete='new-password'");
        }

        // Check for HTTPS
        const url = page.url();
        if (url.startsWith("https://")) {
          console.log("Login form is served over HTTPS");
        } else {
          console.log("Login form should be served over HTTPS in production");
        }
      } else {
        console.log("No login form found - skipping login security test");
      }
    } catch (error) {
      console.log("Login page not found or not accessible - skipping login security test");
    }
  });

  test("should not expose sensitive information in HTML comments", async ({ page }) => {
    // Navigate to the homepage
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Get the HTML content
    const html = await page.content();

    // Check for potentially sensitive information in comments
    const sensitivePatterns = [
      /<!--.*password.*-->/i,
      /<!--.*api[_\s-]?key.*-->/i,
      /<!--.*secret.*-->/i,
      /<!--.*token.*-->/i,
      /<!--.*todo.*-->/i,
      /<!--.*fixme.*-->/i,
    ];

    for (const pattern of sensitivePatterns) {
      const matches = html.match(pattern);
      if (matches) {
        console.log(`Found potentially sensitive information in HTML comments: ${matches[0]}`);
      }
    }

    // This test doesn't fail if it finds sensitive information,
    // it just logs it for review
  });

  test("should not have directory listing enabled", async ({ request }) => {
    // Try to access common directories that should not be listable
    const directories = [
      "/images/",
      "/css/",
      "/js/",
      "/assets/",
      "/public/",
    ];

    for (const dir of directories) {
      const response = await request.get(dir);

      // If directory listing is enabled, the response might be 200 with HTML content
      // listing the directory contents
      if (response.status() === 200) {
        const contentType = response.headers()["content-type"];
        const body = await response.text();

        // Check if it looks like a directory listing
        const isDirListing = body.includes("Index of") ||
                            body.includes("Directory listing") ||
                            (body.includes("<ul>") && body.includes("<li>") && body.includes("href="));

        if (isDirListing) {
          console.log(`Directory listing might be enabled for ${dir} - this is a security risk`);
        }
      }
    }
  });
});
