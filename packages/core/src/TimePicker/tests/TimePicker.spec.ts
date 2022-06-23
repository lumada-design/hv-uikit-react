// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test";
import { testingThemes } from "../../../config/playwright-utils";

testingThemes.forEach(async (theme) => {
  test.describe(`TimePicker ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?id=inputs-time-picker--externally-controlled&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    test(`Contains all the items`, async ({ page }) => {
      await page.locator(`div[name="Time"] > svg`).click();
      // All the up arrows
      await expect(page.locator(`div[name="DropUpXS"]`)).toHaveCount(4);
      // All the inputs
      await expect(page.locator(`input`)).toHaveCount(3);
      // All the down arrows
      await expect(page.locator(`div[name="DropDownXS"]`)).toHaveCount(4);
    });

    test(`Updates the inputs when pressing the arrows and the period button`, async ({ page }) => {
      await page.locator(`div[name="Time"] > svg`).click();
      await expect(page.locator(`input[placeholder="hh"]`)).toHaveValue("9");
      await expect(page.locator(`input[placeholder="mm"]`)).toHaveValue("10");
      await expect(page.locator(`input[placeholder="ss"]`)).toHaveValue("30");

      // Click up
      await page.locator('div[name="DropUpXS"] >> nth = 0').click();
      await expect(page.locator(`input[placeholder="hh"]`)).toHaveValue("10");
      await page.locator('div[name="DropUpXS"] >> nth = 1').click();
      await expect(page.locator(`input[placeholder="mm"]`)).toHaveValue("11");
      await page.locator('div[name="DropUpXS"] >> nth = 2').click();
      await expect(page.locator(`input[placeholder="ss"]`)).toHaveValue("31");

      // Click down
      await page.locator('div[name="DropDownXS"] >> nth = 0').click();
      await expect(page.locator(`input[placeholder="hh"]`)).toHaveValue("09");
      await page.locator('div[name="DropDownXS"] >> nth = 1').click();
      await expect(page.locator(`input[placeholder="mm"]`)).toHaveValue("10");
      await page.locator('div[name="DropDownXS"] >> nth = 2').click();
      await expect(page.locator(`input[placeholder="ss"]`)).toHaveValue("30");

      // Change period
      const periodBtn = await page.locator(
        `div[class="HvTimePickerPeriodPicker-periodContainer"] > button`
      );
      await expect(periodBtn).toHaveText("AM");
      await periodBtn.click();
      await expect(periodBtn).toHaveText("PM");
    });
  });
});
