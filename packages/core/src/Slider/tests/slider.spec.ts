// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test";
import { testingThemes } from "../../../config/playwright-utils";

const suffix = "&eyes-storybook=true&eyes-variation=theme:";

testingThemes.forEach(async (theme) => {
  test.describe(`HvSlider ${theme}`, () => {
    test(`Single slider changes values when interacted`, async ({ page }) => {
      await page.goto(`/iframe.html?id=inputs-slider--main&args=&viewMode=story${suffix}${theme}`);
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("10");
      await page.locator('[aria-label="Failure Rate-0"]').press("Tab");
      await page.locator('div[role="slider"]').press("ArrowRight");
      await page.locator('div[role="slider"]').press("ArrowRight");
      await page.locator('div[role="slider"]').press("ArrowRight");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("13");

      await page.locator('[aria-label="Failure Rate-0"]').press("Tab");
      await page.locator('div[role="slider"]').press("ArrowLeft");
      await page.locator('div[role="slider"]').press("ArrowLeft");
      await page.locator('div[role="slider"]').press("ArrowLeft");
      await page.locator('div[role="slider"]').press("ArrowLeft");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("9");
    });
    test(`Range slider changes values when interacted`, async ({ page }) => {
      await page.goto(
        `/iframe.html?id=inputs-slider--range-slider&args=&viewMode=story${suffix}${theme}`
      );
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("10");
      await expect(page.locator('[aria-label="Failure Rate-1"]')).toHaveValue("40");
      await page.locator("#Range-knob-0").press("ArrowLeft");
      await page.locator("#Range-knob-0").press("ArrowLeft");
      await page.locator("#Range-knob-0").press("ArrowLeft");
      await page.locator("#Range-knob-0").press("ArrowLeft");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("6");
      await page.locator("#Range-knob-1").press("ArrowRight");
      await page.locator("#Range-knob-1").press("ArrowRight");
      await page.locator("#Range-knob-1").press("ArrowRight");
      await expect(page.locator('[aria-label="Failure Rate-1"]')).toHaveValue("43");
      await page.locator('[aria-label="Failure Rate-0"]').click();
      await page.locator('[aria-label="Failure Rate-0"]').fill("49");
      await page.locator('[aria-label="Failure Rate-0"]').press("Enter");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("49");
      await page.locator("#Range-knob-0").press("ArrowRight");
      await page.locator("#Range-knob-0").press("ArrowRight");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("49");
      await page.locator('[aria-label="Failure Rate-0"]').click();
      await page.locator('[aria-label="Failure Rate-0"]').fill("58");
      await page.locator('[aria-label="Failure Rate-0"]').press("Enter");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("58");
      await expect(page.locator('[aria-label="Failure Rate-1"]')).toHaveValue("59");
    });
    test(`Controlled range slider changes values when interacted`, async ({ page }) => {
      await page.goto(
        `http://localhost:9001/iframe.html?id=inputs-slider--range-slider-controlled&args=&viewMode=story${suffix}${theme}`
      );
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("0.0");
      await expect(page.locator('[aria-label="Failure Rate-1"]')).toHaveValue("2.0");
      await page.locator("#RangeSliderControlled-knob-0").press("ArrowLeft");
      await page.locator("#RangeSliderControlled-knob-0").press("ArrowLeft");
      await page.locator("#RangeSliderControlled-knob-0").press("ArrowLeft");
      await page.locator("#RangeSliderControlled-knob-0").press("ArrowLeft");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("-0.8");
      await page.locator("#RangeSliderControlled-knob-1").press("ArrowRight");
      await page.locator("#RangeSliderControlled-knob-1").press("ArrowRight");
      await page.locator("#RangeSliderControlled-knob-1").press("ArrowRight");
      await expect(page.locator('[aria-label="Failure Rate-1"]')).toHaveValue("2.6");
      await page.locator('[aria-label="Failure Rate-0"]').click();
      await page.locator('[aria-label="Failure Rate-0"]').fill("2.4");
      await page.locator('[aria-label="Failure Rate-0"]').press("Enter");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("2.4");
      await page.locator("#RangeSliderControlled-knob-0").press("ArrowRight");
      await page.locator("#RangeSliderControlled-knob-0").press("ArrowRight");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("2.4");
      await page.locator('[aria-label="Failure Rate-0"]').click();
      await page.locator('[aria-label="Failure Rate-0"]').fill("2.8");
      await page.locator('[aria-label="Failure Rate-0"]').press("Enter");
      await expect(page.locator('[aria-label="Failure Rate-0"]')).toHaveValue("2.8");
      await expect(page.locator('[aria-label="Failure Rate-1"]')).toHaveValue("3.0");
    });
  });
});
