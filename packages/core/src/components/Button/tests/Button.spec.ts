import { test } from "@playwright/test";

test("Button", async ({ page }) => {
  await page.goto("http://localhost:6006/?path=/docs/inputs-button--docs");
});
