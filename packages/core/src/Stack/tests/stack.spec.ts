// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test";
import { testingThemes } from "../../../config/playwright-utils";

testingThemes.forEach(async (theme) => {
  test.describe(`Stack ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?id=components-stack--spacing&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    test(`Changes the spacing between the elements`, async ({ page }) => {
      await expect(page.locator(`div.HvStack-xs`)).toBeVisible();
      await page.locator('label:has-text("md")').click();
      await expect(page.locator(`div.HvStack-xs`)).not.toBeVisible();
      await expect(page.locator(`div.HvStack-md`)).toBeVisible();
    });
  });
});
