import { test, expect } from "@playwright/test";

const codeReviewEndPoint = "http://localhost:5173/metrics/code-review-metrics";

test.describe("Code Review Metrics", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(codeReviewEndPoint);
    await page.waitForSelector("table");
  });

  test('should display heading "Code Review Metrics"', async ({ page }) => {
    const element = await page.locator("text=Code Review Metrics").innerHTML();

    expect(element).toBeDefined();
  });

  test("should display required tiles with test for code review metrics", async ({
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

  test("should display time with hours in the tiles", async ({ page }) => {
    const selectors = [
      ".firstReviewResponseTime",
      ".approvalTime",
      ".mergeTime",
    ];

    const regex = /^[0-9]+(\.[0-9]+)?\s?(hour|hours)?$/;

    for (const selector of selectors) {
      const textContent = await page.locator(selector).textContent();

      expect(textContent).toMatch(regex);
    }
  });

  test("should display table", async ({ page }) => {
    const table = await page.$("table");

    expect(table).toBeTruthy();
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
        .locator(`.${selector}-table-header`)
        .innerHTML();

      expect(element).toBeDefined();
    }
  });

  test("should display rows in the code review table", async ({ page }) => {
    const rows = await page.$$(".code-review-metrics-table-row");

    expect(rows.length).toBeGreaterThan(0);
  });
});
