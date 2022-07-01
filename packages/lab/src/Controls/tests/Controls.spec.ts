// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test";
import { testingThemes } from "../../../config/playwright-utils";

const suffix = "&eyes-storybook=true&eyes-variation=theme:";

testingThemes.forEach(async (theme) => {
  test.describe(`HvControls ${theme}`, () => {
    test(`Controls changes values when interacted`, async ({ page }) => {
      await page.goto(
        `/iframe.html?id=lab-controls--controls&args=&viewMode=story${suffix}${theme}`
      );
      await page.locator('[placeholder="Search"]').click();
      await page.locator('[placeholder="Search"]').fill("Major");
      await page.locator('div[role="textbox"] div:has-text("Select...")').first().click();
      await page.locator("text=Name Descending").click();
      await expect(page.locator("text=Event 10")).toHaveText("Event 10");
      await expect(page.locator("text=Event 6")).toHaveText("Event 6");
      await expect(page.locator("text=Event 2")).toHaveText("Event 2");
      await expect(page.locator("text=Event 3")).toHaveCount(0);
      await expect(page.locator("text=Severity")).toHaveCount(3);
    });
    test(`Controls Controlled changes values when interacted`, async ({ page }) => {
      await page.goto(
        `/iframe.html?id=lab-controls--controls-controlled&args=&viewMode=story${suffix}${theme}`
      );
      await page.locator('[placeholder="Search"]').click();
      await page.locator('[placeholder="Search"]').fill("Major");
      await page.locator('div[role="textbox"] div:has-text("Name Ascending")').first().click();
      await page.locator("text=Name Descending").click();
      await expect(page.locator("text=Event 10")).toHaveText("Event 10");
      await expect(page.locator("text=Event 6")).toHaveText("Event 6");
      await expect(page.locator("text=Event 2")).toHaveText("Event 2");
      await expect(page.locator("text=Event 3")).toHaveCount(0);
      await expect(page.locator("text=Severity")).toHaveCount(3);
    });
  });
});
