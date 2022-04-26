// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test";
import { testingThemes } from "../../../config/playwright-utils";

testingThemes.forEach(async (theme: string) => {
  test.describe(`Banner ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?id=components-banner--banner-controller&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    const banners = [
      {
        button: "default",
        message: "This is a banner",
      },
      {
        button: "success",
        message: "This is a success banner",
      },
      {
        button: "error",
        message: "This is an error banner",
      },
    ];

    test(`Contains three different buttons`, async ({ page }) => {
      await Promise.all(
        banners.map((b) => expect(page.locator(`button:has-text("${b.button}")`)).toBeVisible())
      );
    });

    banners.forEach(({ button, message }) => {
      test(`Click in ${button} opens the banner`, async ({ page }) => {
        await page.locator(`button:has-text("${button}")`).click();
        await expect(page.locator(`div[role="alert"]:has-text("${message}")`)).toBeVisible();
        await page.locator('[aria-label="Close the banner"]').click();
        await expect(page.locator(`div[role="alert"]:has-text("${message}")`)).not.toBeVisible();
      });
    });
  });
});
