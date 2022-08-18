// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect, Locator } from "@playwright/test";
// eslint-disable-next-line import/no-relative-packages
import { testingThemes } from "../../../config/playwright-utils";

const NUM_ROWS = 5;
const NUM_COLS = 9;

// Note: at some point Safari's default behavior appears to have changed to not tab navigation
// enabled by default, which broke this test because Playwright depends on the browser defaults.
// Doing Alt+Tab seems to do the trick, but it doesn't work in the other browsers (at least Firefox),
// so I added a browser check in the tests below. Reference:
//   https://github.com/microsoft/playwright/issues/2114
const pressTab = async (table: Locator, browserName: string) => {
  if (browserName === "webkit") {
    await table.press("Alt+Tab");
  } else {
    await table.press("Tab");
  }
};

testingThemes.forEach(async (theme: string) => {
  test.describe(`Table ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?id=display-table--list-row&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    test(`List Row: check row number and column number`, async ({ page }) => {
      await expect(page.locator(`div.HvTableContainer-root`)).toBeVisible();
      const rows = await page.locator(".HvTableRow-root");
      expect(rows).toHaveCount(NUM_ROWS);
      const count = await rows.count();
      for (let i = 1; i < count; i += 1) {
        const cells = rows.nth(i).locator("td");
        expect(cells).toHaveCount(NUM_COLS);
      }
    });

    test(`List Row: check focus checkbox`, async ({ page, browserName }) => {
      const checks = await page.locator("input[type=checkbox]");
      expect(checks).toHaveCount(NUM_ROWS - 1);

      expect(await checks.nth(0).isChecked());
      for (let i = 1; i < NUM_ROWS - 2; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        expect(await checks.nth(i).isChecked()).toBeFalsy();
      }

      const table = await page.locator(".HvTable-root");
      pressTab(table, browserName);
      await table.press(" ");
      await table.press("ArrowDown");
      await table.press("ArrowDown");
      await table.press("ArrowDown");
      pressTab(table, browserName);
      await table.press(" ");

      for (let i = 0; i < NUM_ROWS - 2; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        expect(await checks.nth(i).isChecked()).toBeFalsy();
      }
      expect(await checks.nth(NUM_ROWS - 2).isChecked());
    });

    test(`List Row: check focus actions`, async ({ page, browserName }) => {
      expect(await page.locator(".HvPanel-root")).toBeHidden();

      const table = await page.locator(".HvTable-root");
      pressTab(table, browserName);
      pressTab(table, browserName);
      pressTab(table, browserName);
      await table.press("Enter");

      expect(await page.locator(".HvPanel-root")).toBeVisible();
    });
  });
});
