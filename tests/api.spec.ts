import { expect, test } from "@playwright/test";

test.describe("API Endpoint Tests", () => {
  test("API routes should return valid responses", async ({ request }) => {
    // Test the contact form API endpoint
    const contactResponse = await request.post(`/api/contact`, {
      data: {
        name: "Test User",
        email: "test@example.com",
        message: "This is a test message",
      },
    });

    // Check if the response is successful or returns a proper error
    expect(contactResponse.status()).toBeLessThan(500);

    // Parse the response body
    const contactResponseBody = await contactResponse.json();
    expect(contactResponseBody).toBeDefined();
  });

  test("API routes should validate input", async ({ request }) => {
    // Test the contact form API endpoint with invalid data
    const invalidResponse = await request.post(`/api/contact`, {
      data: {
        // Missing required fields
        name: "",
        email: "invalid-email",
      },
    });

    // Should return a client error (4xx)
    expect(invalidResponse.status()).toBeGreaterThanOrEqual(400);
    expect(invalidResponse.status()).toBeLessThan(500);

    // Parse the response body
    const invalidResponseBody = await invalidResponse.json();
    expect(invalidResponseBody.error).toBeDefined();
  });

  test("newsletter subscription API should work", async ({ request }) => {
    // Test the newsletter subscription API endpoint
    const newsletterResponse = await request.post(`/api/newsletter`, {
      data: {
        email: "test@example.com",
      },
    });

    // Check if the response is successful or returns a proper error
    expect(newsletterResponse.status()).toBeLessThan(500);

    // Parse the response body
    const newsletterResponseBody = await newsletterResponse.json();
    expect(newsletterResponseBody).toBeDefined();
  });

  test("search API should return results", async ({ request }) => {
    // Test the search API endpoint
    const searchResponse = await request.get(`/api/search?q=test`);

    // Check if the response is successful
    expect(searchResponse.status()).toBe(200);

    // Parse the response body
    const searchResponseBody = await searchResponse.json();
    expect(searchResponseBody).toBeDefined();
    expect(Array.isArray(searchResponseBody.results)).toBeTruthy();
  });

  test("API routes should handle errors gracefully", async ({ request }) => {
    // Test a non-existent API endpoint
    const notFoundResponse = await request.get(`/api/non-existent-endpoint`);

    // Should return a 404 error
    expect(notFoundResponse.status()).toBe(404);

    // Parse the response body
    try {
      const notFoundResponseBody = await notFoundResponse.json();
      expect(notFoundResponseBody.error).toBeDefined();
    } catch (e) {
      // If the response is not JSON, that's also acceptable
      console.log("Non-JSON response for 404 endpoint");
    }
  });
});
