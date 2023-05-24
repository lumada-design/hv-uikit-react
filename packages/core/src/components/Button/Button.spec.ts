import { test, expect } from "@playwright/test";

test.describe("Button", () => {
  test("disabled", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/inputs-button--disabled"
    );
    const button = await page
      .frameLocator("#storybook-preview-iframe")
      .getByRole("button", { name: "Primary Ghost" });
    await expect(button).toBeDisabled();
  });

  test("clickable", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/inputs-button--semantic"
    );
    page.once("dialog", (dialog) => {
      dialog.dismiss().catch(() => {});
    });
    await page
      .frameLocator("#storybook-preview-iframe")
      .getByRole("button", { name: "Favorite" })
      .click();
  });

  test("keyboard press", async ({ page }) => {
    await page.goto(
      "http://localhost:6006/?path=/story/inputs-button--semantic"
    );
    page.once("dialog", (dialog) => {
      dialog.dismiss().catch(() => {});
    });
    await page
      .frameLocator("#storybook-preview-iframe")
      .getByRole("button", { name: "Favorite" })
      .press("Enter");
  });
});
