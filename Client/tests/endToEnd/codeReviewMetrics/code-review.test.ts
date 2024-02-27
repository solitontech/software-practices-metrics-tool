import "dotenv/config";

import { test, expect } from "@playwright/test";

import { pathToCodeReviewMetrics } from "../../../src/constants/routeConstants";

const codeReviewEndPoint = `${process.env.SERVER_URL}${pathToCodeReviewMetrics}`;

test.describe("Code Review Metrics page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(codeReviewEndPoint);
    await page.waitForSelector("table");
  });

  test('should display heading "Code Review Metrics"', async ({ page }) => {
    const element = await page.locator("text=Code Review Metrics").innerHTML();

    expect(element).toBeDefined();
  });

  test("should display required tiles with text for code review metrics", async ({
    page,
  }) => {
    const selectors = [
      "text=Avg first review response time",
      "text=Avg approval time",
      "text=Avg merge time",
    ];

    for (const selector of selectors) {
      const element = await page.locator(selector).innerHTML();

      expect(element).toBeDefined();
    }
  });

  test("should display time with hours in the code review tiles", async ({
    page,
  }) => {
    const selectors = [
      "[data-testid='first-review-response-time']",
      "[data-testid='approval-time']",
      "[data-testid='merge-time']",
    ];

    const regex = /^[0-9]+(\.[0-9]+)?\s?(hour|hours)?$/;

    for (const selector of selectors) {
      const textContent = await page.locator(selector).textContent();

      expect(textContent).toMatch(regex);
    }
  });

  test("should display column headers in the code review table", async ({
    page,
  }) => {
    const selectors = [
      "startDate",
      "endDate",
      "title",
      "tags",
      "status",
      "comments",
      "votesHistory",
      "votes",
      "firstReviewResponseTimeInSeconds",
      "approvalTimeInSeconds",
      "mergeTimeInSeconds",
      "createdBy",
    ];

    for (const selector of selectors) {
      const element = await page
        .locator(`[data-testid="${selector}-table-header"]`)
        .innerHTML();

      expect(element).toBeDefined();
    }
  });

  test("should display rows in the code review table", async ({ page }) => {
    const rows = await page.$$("[data-testid='code-review-metrics-table-row']");

    expect(rows.length).toBeGreaterThan(0);
  });
});
