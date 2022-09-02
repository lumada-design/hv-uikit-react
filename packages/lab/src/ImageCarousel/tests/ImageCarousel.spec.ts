// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from "@playwright/test";
import { testingThemes } from "../../../config/playwright-utils";

testingThemes.forEach(async (theme) => {
  test.describe(`HvImageCarousel ${theme}`, () => {
    test("Main changes image when interacted", async ({ page }) => {
      await page.goto("http://localhost:9001/iframe.html?id=lab-imagecarousel--main");
      await page.goto(
        "http://localhost:9001/iframe.html?id=lab-imagecarousel--main&viewMode=story"
      );
      await expect(page.locator("text=1 / 9")).toHaveCount(1);
      await expect(page.locator("text=2 / 9")).toHaveCount(0);
      await expect(page.locator("text=9 / 9")).toHaveCount(0);
      await page.locator('[aria-label="Backwards"]').click();
      await expect(page.locator("text=1 / 9")).toHaveCount(0);
      await expect(page.locator("text=2 / 9")).toHaveCount(0);
      await expect(page.locator("text=9 / 9")).toHaveCount(1);
      await page.locator('[aria-label="Forwards"]').click();
      await expect(page.locator("text=1 / 9")).toHaveCount(1);
      await expect(page.locator("text=2 / 9")).toHaveCount(0);
      await expect(page.locator("text=9 / 9")).toHaveCount(0);
      await page.locator("#BobaFett").click();
      await expect(page.locator("text=1 / 9")).toHaveCount(0);
      await expect(page.locator("text=2 / 9")).toHaveCount(1);
      await expect(page.locator("text=9 / 9")).toHaveCount(0);
    });

    test("Without thumbnails changes image when interacted", async ({ page }) => {
      await page.goto("http://localhost:9001/iframe.html?id=lab-imagecarousel--without-thumbnails");
      await page.goto(
        "http://localhost:9001/iframe.html?id=lab-imagecarousel--without-thumbnails&viewMode=story"
      );
      await expect(page.locator("text=1 / 9")).toHaveCount(1);
      await expect(page.locator("text=2 / 9")).toHaveCount(0);
      await page.locator('[aria-label="Forwards"]').click();
      await expect(page.locator("text=1 / 9")).toHaveCount(0);
      await expect(page.locator("text=2 / 9")).toHaveCount(1);
    });

    test("Low cardinality changes image when interacted", async ({ page }) => {
      await page.goto("http://localhost:9001/iframe.html?id=lab-imagecarousel--low-cardinality");
      await page.goto(
        "http://localhost:9001/iframe.html?id=lab-imagecarousel--low-cardinality&viewMode=story"
      );
      await expect(page.locator('[title="BigCircle 0"]')).toHaveCount(1);
      await expect(page.locator('[title="BigCircle 1"]')).toHaveCount(0);
      await page.locator(".HvImageCarousel-lowButtons").click();
      await page.locator('[aria-label="Forwards"]').click();
      await expect(page.locator('[title="BigCircle 0"]')).toHaveCount(0);
      await expect(page.locator('[title="BigCircle 1"]')).toHaveCount(1);
    });

    test("Image Carousel xs changes image when interacted", async ({ page }) => {
      await page.goto("http://localhost:9001/iframe.html?id=lab-imagecarousel--image-carousel-xs");
      await page.goto(
        "http://localhost:9001/iframe.html?id=lab-imagecarousel--image-carousel-xs&viewMode=story"
      );
      await expect(page.locator("text=1/5")).toHaveCount(1);
      await expect(page.locator("text=2/5")).toHaveCount(0);
      await page.locator(".HvImageCarousel-lowButtons").click();
      await page.locator('[aria-label="Forwards"]').click();
      await expect(page.locator("text=1/5")).toHaveCount(0);
      await expect(page.locator("text=2/5")).toHaveCount(1);
    });
  });
});
