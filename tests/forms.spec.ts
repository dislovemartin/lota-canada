import { expect, test } from "@playwright/test";

test.describe("Form Validation Tests", () => {
  test("contact form should validate required fields", async ({ page }) => {
    // Navigate to the contact page
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    // Try to submit the form without filling required fields
    const submitButton = page.getByRole("button", { name: /submit|send/i });
    await submitButton.click();

    // Check for validation messages
    const validationMessages = await page
      .locator('[aria-invalid="true"], .error-message, .validation-error')
      .all();
    expect(validationMessages.length).toBeGreaterThan(0);
  });

  test("contact form should accept valid input", async ({ page }) => {
    // Navigate to the contact page
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");

    // Fill out the form with valid data
    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill("test@example.com");

    // Look for message or subject field and fill it
    const messageField = await page.getByLabel(/message|comment/i).first();
    await messageField.fill("This is a test message");

    // Submit the form
    const submitButton = page.getByRole("button", { name: /submit|send/i });
    await submitButton.click();

    // Check for success message or redirect
    // This will depend on your implementation
    try {
      // Option 1: Look for success message
      const successMessage = await page
        .locator('.success-message, [role="alert"]')
        .first();
      if (await successMessage.isVisible()) {
        expect(await successMessage.textContent()).toContain(
          /thank|success|received/i
        );
      } else {
        // Option 2: Check if we were redirected to a thank you page
        const currentUrl = page.url();
        expect(currentUrl).toMatch(/thank|success|confirmation/i);
      }
    } catch (e) {
      // If neither option works, the test will fail
      console.log(
        "Could not find success indication, checking if form was reset"
      );
      // Option 3: Check if form was reset (fields are empty)
      const nameValue = await page.getByLabel(/name/i).inputValue();
      expect(nameValue).toBe("");
    }
  });

  test("login form should validate credentials", async ({ page }) => {
    // Navigate to the login page
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    // Try to login with invalid credentials
    await page.getByLabel(/email|username/i).fill("invalid@example.com");
    await page.getByLabel(/password/i).fill("wrongpassword");

    // Submit the form
    const loginButton = page.getByRole("button", {
      name: /log in|sign in|login/i,
    });
    await loginButton.click();

    // Check for error message
    const errorMessage = await page
      .locator('.error-message, [role="alert"]')
      .first();
    expect(await errorMessage.isVisible()).toBeTruthy();
  });
});
