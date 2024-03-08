import "dotenv/config";
import { test, expect, Page } from "@playwright/test";

import { pathToCodeReviewMetrics } from "../../../src/constants/routeConstants";
import { TIMEOUT_PERIOD, WAIT_UNTIL } from "../constants/e2e.constants";

const codeReviewEndPoint = `${process.env.CLIENT_DEV_URL}${pathToCodeReviewMetrics}`;

test.describe("Code Review Metrics page", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();

    page = await context.newPage();

    await page.goto(codeReviewEndPoint, {
      waitUntil: WAIT_UNTIL,
      timeout: TIMEOUT_PERIOD,
    });

    await page.waitForSelector("table");
  });

  test('should display heading "Code Review Metrics"', async () => {
    const element = await page.locator("text=Code Review Metrics").isVisible();

    expect(element).toBeTruthy();
  });

  test("should display required tiles with text for code review metrics", async () => {
    const selectors = ["text=Avg first review response time", "text=Avg approval time", "text=Avg merge time"];

    for (const selector of selectors) {
      const element = await page.locator(selector).isVisible();

      expect(element).toBeTruthy();
    }
  });

  test("should display time with hours in the code review tiles", async () => {
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

  test("should display table in code review metrics", async () => {
    const table = await page.$("table");

    expect(table).toBeTruthy();
  });

  test("should display column headers in the code review table", async () => {
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
      const element = await page.locator(`[data-testid="${selector}-table-header"]`).isVisible();

      expect(element).toBeTruthy();
    }
  });

  test("should display rows in the code review table", async () => {
    const rows = await page.$$("[data-testid='code-review-metrics-table-row']");

    expect(rows.length).toBeGreaterThan(0);
  });
});
