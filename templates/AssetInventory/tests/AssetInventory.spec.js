import { test, expect } from "@playwright/test";
import { testingThemes } from "../../config/playwright-utils";
import { idsToControl } from "../utils";

testingThemes.forEach(async (theme) => {
  test.describe(`Asset Inventory ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?args=&id=templates-asset-inventory--main&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    test(`should alternate between cards and list view`, async ({ page }) => {
      await expect(page.locator(`#${idsToControl.cards}`)).toBeVisible();

      const listBtn = await page.locator(`[aria-label="Select list view"]`);
      const carcBtn = await page.locator(`[aria-label="Select card view"]`);

      await listBtn.click();
      await expect(page.locator(`#${idsToControl.list}`)).toBeVisible();

      await carcBtn.click();
      await expect(page.locator(`#${idsToControl.cards}`)).toBeVisible();
    });

    test(`search should filter the results`, async ({ page }) => {
      await expect(page.locator(`#${idsToControl.cards} > div`)).toHaveCount(8);

      const searchInput = await page.locator(`input[placeholder="Search"]`);
      searchInput.fill("10");

      await expect(page.locator(`#${idsToControl.cards} > div`)).toHaveCount(2);
    });

    test(`sorting should change the order of the results`, async ({ page }) => {
      await page.pause();

      await expect(
        page.locator(`#${idsToControl.cards} > div > div >> nth = 1 >> span`)
      ).toHaveText("Event 1");

      const sortDropDown = page.locator(`.HvDropdown-dropdown`);
      sortDropDown.click();
      await page.locator("text=Name Descending").click();

      await expect(
        page.locator(`#${idsToControl.cards} > div > div >> nth = 1 >> span`)
      ).toHaveText("Event 11");
    });
  });
});
