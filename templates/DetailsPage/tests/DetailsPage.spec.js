import { test } from "@playwright/test";
import { testingThemes } from "../../config/playwright-utils";

testingThemes.forEach(async (theme) => {
  test.describe(`Details Page ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?args=&id=templates-details-page--main&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    test(`should alternate between sections`, async ({ page }) => {
      const kpis = await page.locator('role=button[name="KPIs"]');
      await kpis.click();

      const properties = await page.locator('role=button[name="Properties"]');
      await properties.click();

      const events = await page.locator('role=button[name="Events"]');
      await events.click();
    });

    test(`should alternate between sections keyboard`, async ({ page }) => {
      const kpis = await page.locator('role=button[name="KPIs"]');
      await kpis.press("Enter");

      const properties = await page.locator('role=button[name="Properties"]');
      await properties.press("Enter");

      const events = await page.locator('role=button[name="Events"]');
      await events.press("Enter");
    });
  });
});
