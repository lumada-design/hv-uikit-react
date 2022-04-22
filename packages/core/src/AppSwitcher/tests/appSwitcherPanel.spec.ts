// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test";
import { testingThemes } from "../../../config/playwright-utils";

testingThemes.forEach(async (theme) => {
  test.describe(`AppSwitcher ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?id=components-app-switcher--main&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    test(`Contains five items`, async ({ page }) => {
      await expect(page.locator(`li.HvAppSwitcher-item`)).toHaveCount(5);
    });

    test(`Redirects to link when an item has a link`, async ({ page }) => {
      await page.locator(`li:has-text("UI KIT Storybook")`).click();
      await expect(page.url()).toBe("https://lumada-design.github.io/uikit/");
    });

    test(`Opens a new tab when target is set to _blank`, async ({ page, context }) => {
      // Listen to new pages
      context.on("page", async (p) => {
        await expect(p.url()).toBe("https://github.com/lumada-design/hv-uikit-react/");
      });

      await page.locator(`li:has-text("UI Kit repository (New Tab)")`).click();
    });

    test(`Displays a tooltip when hovering on the info icon`, async ({ page }) => {
      await page.locator(`:nth-match(div[role="img"], 1)`).hover();
      await expect(page.locator('div[role="tooltip"]')).toBeVisible();
    });
  });
});
