import "dotenv/config";
import { test, expect, Page } from "@playwright/test";

import { pathToTrunkBasedMetrics } from "../../../src/constants/route.constant";
import { TIMEOUT_PERIOD, WAIT_UNTIL } from "../constants/e2e.constants";

const trunkBasedMetricsEndPoint = `${process.env.CLIENT_DEV_URL}${pathToTrunkBasedMetrics}`;

test.describe("Trunk Based Metrics page", () => {
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();

    page = await context.newPage();

    await page.goto(trunkBasedMetricsEndPoint, {
      waitUntil: WAIT_UNTIL,
      timeout: TIMEOUT_PERIOD,
    });
    await page.waitForSelector("table");
  });

  test('should display heading "Trunk Based Metrics"', async () => {
    const element = await page.locator("text=Trunk Based Metrics").isVisible();

    expect(element).toBeTruthy();
  });

  test("should display required tiles with text for trunk based metrics", async () => {
    await page.goto(trunkBasedMetricsEndPoint);

    const selectors = [
      "text=Total no of branches",
      "text=Active PR's to trunk branch",
      "text=Branches following naming standard",
      "text=Total Pull Requests",
      "text=Percentage of branches merged",
    ];

    await Promise.all(
      selectors.map(async (selector) => {
        const element = await page.waitForSelector(selector, {
          state: "visible",
        });
        const isVisible = await element.isVisible();

        expect(isVisible).toBeTruthy();
      }),
    );
  });

  test("should display tiles with number for trunk based metrics", async () => {
    const selectors = [
      "[data-testid='total-branches']",
      "[data-testid='active-branches']",
      "[data-testid='total-pull-requests']",
    ];

    const regex = /^[0-9]+$/;

    for (const selector of selectors) {
      const textContent = await page.locator(selector).textContent();

      expect(textContent).toMatch(regex);
    }
  });

  test("should display titles with number and percentage for trunk based metrics", async () => {
    const selectors = [
      "[data-testid='branches-following-naming-standard']",
      "[data-testid='merged-branches-percentage']",
    ];

    const regex = /^[0-9]+(\.[0-9]+)?%$/;

    for (const selector of selectors) {
      const textContent = await page.locator(selector).textContent();

      expect(textContent).toMatch(regex);
    }
  });

  test("should display table in trunk based metrics", async () => {
    const table = await page.$("table");

    expect(table).toBeTruthy();
  });

  test("should display column headers in the trunk based table", async () => {
    const selectors = ["name", "title", "creationDate", "closedDate", "status"];

    for (const selector of selectors) {
      const element = await page.locator(`[data-testid="${selector}-table-header"]`).isVisible();

      expect(element).toBeTruthy();
    }
  });

  test("should display rows in the trunk based table", async () => {
    const rows = await page.$$("[data-testid='trunk-based-metrics-table-row']");

    expect(rows.length).toBeGreaterThan(0);
  });
});
