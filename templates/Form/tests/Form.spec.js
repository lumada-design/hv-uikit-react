import { test, expect } from "@playwright/test";
import { testingThemes } from "../../config/playwright-utils";

testingThemes.forEach(async (theme) => {
  test.describe(`Form ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(
        `/iframe.html?args=&id=templates-form--main&viewMode=story&eyes-storybook=true&eyes-variation=theme:${theme}`
      );
    });

    test(`Submit and cancel buttons should be disabled at startup`, async ({ page }) => {
      await expect(page.locator("#submit")).toBeDisabled();
      await expect(page.locator("#cancel")).toBeDisabled();
    });

    test(`Filling a field on the form should enable the Cancel button`, async ({ page }) => {
      await expect(page.locator("#cancel")).toBeDisabled();

      const assetInput = await page.locator("#asset-input");
      assetInput.fill("test");

      await expect(page.locator("#cancel")).toBeEnabled();
    });

    test(`Filling all required fields on the form should enable the Submit button`, async ({
      page,
    }) => {
      await expect(page.locator("#submit")).toBeDisabled();

      await page.locator("#asset-input").fill("test");
      await page.locator("#location-input").fill("Portugal");
      await page.locator("#project-input").fill("test");
      await page.locator("#version-input").fill("1");
      await page.locator("#name-input").fill("test");
      await page.locator("#description-input").fill("test");

      await expect(page.locator("#submit")).toBeEnabled();
    });

    test(`Filling a field with the incorrect data should display an error message`, async ({
      page,
    }) => {
      await page.pause();
      await expect(page.locator("#version-error")).not.toBeVisible();
      await page.pause();
      await page.locator("#version-input").fill("test");
      await page.pause();
      await expect(page.locator("#version-error")).toBeVisible();
      await page.pause();
    });
  });
});
