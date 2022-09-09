import { test, expect } from "@playwright/test";
import { testingThemes } from "../../config/playwright-utils";

testingThemes.forEach(async (theme) => {
  test.describe(`List View ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?args=&id=templates-list-view--main&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    test(`clicking on a kpi should filter the results`, async ({ page }) => {
      const kpi0 = page.locator(`#kpi0`);
      await kpi0.click();
      await expect(page.locator(`[name="Level1"]`)).toHaveCount(1);
      await expect(page.locator(`[name="Level2Average"]`)).toHaveCount(1);
      await expect(page.locator(`[name="Level3Bad"]`)).toHaveCount(1);

      const kpi1 = page.locator(`#kpi1`);
      await kpi1.click();
      await expect(page.locator(`[name="Level0Good"]`)).toHaveCount(1);
      await expect(page.locator(`[name="Level1"]`)).toHaveCount(1);
      await expect(page.locator(`[name="Level2Average"]`)).toHaveCount(1);

      const kpi2 = page.locator(`#kpi2`);
      await kpi2.click();
      await expect(page.locator(`[name="Level0Good"]`)).toHaveCount(1);
      await expect(page.locator(`[name="Level1"]`)).toHaveCount(1);
      await expect(page.locator(`[name="Level3Bad"]`)).toHaveCount(1);

      const kpi3 = page.locator(`#kpi3`);
      await kpi3.click();
      await expect(page.locator(`[name="Level0Good"]`)).toHaveCount(1);
      await expect(page.locator(`[name="Level2Average"]`)).toHaveCount(1);
      await expect(page.locator(`[name="Level2Average"]`)).toHaveCount(1);
    });
  });
});
