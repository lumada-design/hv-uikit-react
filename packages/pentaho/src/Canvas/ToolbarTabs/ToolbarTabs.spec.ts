import { expect, test, type Page } from "@playwright/test";

// Playwright tests were added because unit tests were not working properly since the
// component's layout changes according with the screen width

const goToUncontrolledSample = (page: Page) =>
  page.goto(
    "./iframe.html?args=&id=pentaho-canvas-toolbar-tabs--main&viewMode=story",
  );

const goToControlledSample = (page: Page) =>
  page.goto(
    "./iframe.html?args=&id=pentaho-canvas-toolbar-tabs--controlled&viewMode=story",
  );

const goToNotEditableSample = (page: Page) =>
  page.goto(
    "./iframe.html?args=&id=pentaho-canvas-toolbar-tabs--not-editable&viewMode=story",
  );

const goToNotRemovableSample = (page: Page) => {
  page.goto(
    "./iframe.html?args=&id=pentaho-canvas-toolbar-tabs--not-removable&viewMode=story",
  );

  // Wait for the root element of the Storybook to be visible
  return page.waitForSelector("#storybook-root", { state: "visible" });
};

test.beforeEach(async ({ page }) => {
  page.setViewportSize({ width: 650, height: 500 });
});

test("renders all components when they are tabs", async ({ page }) => {
  await goToUncontrolledSample(page);

  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  const tabList = page.getByRole("tablist");
  const selectedTab = page.getByRole("tab", { selected: true });
  const otherTab = page.getByRole("tab", { selected: false });

  await expect(createBtn).toBeVisible();
  await expect(tabList).toBeVisible();
  await expect(selectedTab).toContainText("My first tab");
  await expect(otherTab).toContainText("My tab with a very long label");
  expect(await page.getByRole("tab").all()).toHaveLength(2);
  expect(await page.locator("[data-name=CloseXS]").all()).toHaveLength(2);
});

test("renders all components when they are no tabs", async ({ page }) => {
  await goToControlledSample(page);

  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  const tabList = page.getByRole("tablist");

  await expect(createBtn).toBeVisible();
  await expect(tabList).not.toBeVisible();
  expect(await page.getByRole("tab").all()).toHaveLength(0);
  expect(await page.locator("[data-name=CloseXS]").all()).toHaveLength(0);
});

test("renames selected tab when uncontrolled", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  const labelEditor = page.getByText("My first tab");
  await labelEditor.click();
  await labelEditor.fill("My new label");
  await page.keyboard.press("Enter");

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My new label");
});

test("renames selected tab when controlled", async ({ page }) => {
  await goToControlledSample(page);

  // Add new tab
  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  await createBtn.click();

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Undefined 1");

  const labelEditor = page.getByText("Undefined 1");
  await labelEditor.click();
  await labelEditor.fill("My new label");
  await page.keyboard.press("Enter");

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My new label");
});

test("renames selected tab when using the keyboard", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await page.keyboard.type("1");
  await page.keyboard.press("Enter");

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab1");
});

test("adds tab and then changes selected tab and creates dropdown menu if needed when uncontrolled", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  // Add new tab
  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  await createBtn.click();

  // Rename new tab
  const labelEditor = page.getByText("Undefined 3");
  await labelEditor.click();
  await labelEditor.fill("My new label");
  await page.keyboard.press("Enter");

  // Not overflowing
  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My new label");
  expect(await page.getByRole("tab").all()).toHaveLength(3);

  // Add second tab
  await createBtn.click();

  // Overflowing
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Undefined 4");
  expect(await page.getByRole("tab").all()).toHaveLength(3);
  const dropdownMenu = page.getByRole("button", { name: "Dropdown menu" });
  await dropdownMenu.click();
  const menu = page.getByRole("menu");
  await expect(menu).toBeVisible();
  expect(await page.getByRole("menuitem").allTextContents()).toEqual([
    "My new label",
  ]);
});

test("adds tab and then changes selected tab and creates dropdown menu if needed when controlled", async ({
  page,
}) => {
  await goToControlledSample(page);

  // Add three new tabs
  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  await createBtn.click();
  await createBtn.click();
  await createBtn.click();

  // Rename last tab
  let labelEditor = page.getByText("Undefined 3");
  await labelEditor.click();
  await labelEditor.fill("My new label");
  await page.keyboard.press("Enter");

  // Not overflowing
  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My new label");
  expect(await page.getByRole("tab").all()).toHaveLength(3);

  // Add fourth tab
  await createBtn.click();

  // Overflowing
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Undefined 4");
  expect(await page.getByRole("tab").all()).toHaveLength(3);
  let dropdownMenu = page.getByRole("button", { name: "Dropdown menu" });
  await dropdownMenu.click();
  let menu = page.getByRole("menu");
  await expect(menu).toBeVisible();
  expect(await page.getByRole("menuitem").allTextContents()).toEqual([
    "My new label",
  ]);

  // Rename last tab
  labelEditor = page.getByText("Undefined 4");
  await labelEditor.click();
  await labelEditor.fill("My other new label");
  await page.keyboard.press("Enter");

  // Add fifth tab
  await createBtn.click();

  // Overflowing
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Undefined 5");
  expect(await page.getByRole("tab").all()).toHaveLength(3);
  dropdownMenu = page.getByRole("button", { name: "Dropdown menu" });
  await dropdownMenu.click();
  menu = page.getByRole("menu");
  await expect(menu).toBeVisible();
  expect(await page.getByRole("menuitem").allTextContents()).toEqual([
    "My new label",
    "My other new label",
  ]);
});

test("closes selected tab and then changes selected tab when uncontrolled", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  // Close first tab
  let closeBtn = page.locator("[data-name=CloseXS]").first();
  await closeBtn.click();

  const tabList = page.getByRole("tablist");
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(tabList).toBeVisible();
  await expect(selectedTab).toContainText("My tab with a very long label");
  expect(await page.getByRole("tab").all()).toHaveLength(1);

  // Close remaining tab
  closeBtn = page.locator("[data-name=CloseXS]").first();
  await closeBtn.click();
  expect(await page.getByRole("tab").all()).toHaveLength(0);
});

test("closes selected tab and then changes selected tab when controlled", async ({
  page,
}) => {
  await goToControlledSample(page);

  // Add two new tabs
  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  await createBtn.click();
  await createBtn.click();

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Undefined 2");

  // Close selected tab
  let closeBtn = page.locator("[data-name=CloseXS]").nth(1);
  await closeBtn.click();

  const tabList = page.getByRole("tablist");
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(tabList).toBeVisible();
  await expect(selectedTab).toContainText("Undefined 1");
  expect(await page.getByRole("tab").all()).toHaveLength(1);

  // Close remaining tab
  closeBtn = page.locator("[data-name=CloseXS]").first();
  await closeBtn.click();
  expect(await page.getByRole("tab").all()).toHaveLength(0);
});

test("closes selected tab and then changes selected tab when using the keyboard", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  // Close first tab
  await page.keyboard.press("Tab");
  await page.keyboard.press("Delete"); // through delete

  const tabList = page.getByRole("tablist");
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(tabList).toBeVisible();
  await expect(selectedTab).toContainText("My tab with a very long label");
  expect(await page.getByRole("tab").all()).toHaveLength(1);

  // Close remaining tab
  await page.keyboard.press("Tab");
  await page.keyboard.press("Backspace"); // through backspace
});

test("changes selected tab when uncontrolled", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  // Change selected tab
  const labelEditor = page.getByText("My tab with a very long label");
  await labelEditor.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My tab with a very long label");
});

test("changes selected tab when controlled", async ({ page }) => {
  await goToControlledSample(page);

  // Add two new tabs
  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  await createBtn.click();
  await createBtn.click();

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Undefined 2");

  // Change selected tab
  const labelEditor = page.getByText("Undefined 1");
  await labelEditor.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Undefined 1");
});

test("changes selected tab when using the keyboard", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  // Change selected tab
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowRight");

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My tab with a very long label");
});

test("doesn't change selected tab when only using the tab key to navigate", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");
});

test("selects previous tab when tab is closed", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  // Change selected tab
  const labelEditor = page.getByText("My tab with a very long label");
  await labelEditor.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My tab with a very long label");

  // Close selected tab
  const closeBtn = page.locator("[data-name=CloseXS]").nth(1);
  await closeBtn.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");
});

test("selects next tab when tab with no previous tab is closed", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");

  // Close selected tab
  const closeBtn = page.locator("[data-name=CloseXS]").first();
  await closeBtn.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My tab with a very long label");
});

test("can close any tab", async ({ page }) => {
  await goToUncontrolledSample(page);

  const firstCloseBtn = page.locator("[data-name=CloseXS]").first();
  const secondCloseBtn = page.locator("[data-name=CloseXS]").nth(1);
  await expect(firstCloseBtn).toBeEnabled();
  await expect(secondCloseBtn).toBeEnabled();
  expect(await page.locator("[data-name=CloseXS]").all()).toHaveLength(2);
  await secondCloseBtn.click();
  await firstCloseBtn.click();
  expect(await page.getByRole("tab").all()).toHaveLength(0);
});

test("adds tab with icon when defined", async ({ page }) => {
  await goToUncontrolledSample(page);

  // Add new tab
  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  await createBtn.click();

  const leaf = page.getByTestId("leaf");
  await expect(leaf).toBeVisible();
});

test("can't rename selected tab when disableTabEdit is set to true", async ({
  page,
}) => {
  await goToNotEditableSample(page);

  const selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Tab 1");

  const labelEditor = page.getByText("Tab 1");
  await labelEditor.click();
  await labelEditor
    .fill("My new label")
    .catch((err) => expect(String(err)).toContain("attempting fill action"));
});

test("uses previous value when trying to clear a tab label", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  const labelEditor = page.getByText("My first tab");
  await labelEditor.click();
  await labelEditor.clear();
  await page.keyboard.press("Enter");

  const selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");
});

test("uses previous value when clicking on escape when editing label", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  const labelEditor = page.getByText("My first tab");
  await labelEditor.click();
  await labelEditor.fill("123");
  await page.keyboard.press("Escape");

  const selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("My first tab");
});

test("can't close tab through UI and keyboard when the fixed property is set to true for a tab", async ({
  page,
}) => {
  await goToNotRemovableSample(page);

  // Try to close tab through keyboard
  await page.keyboard.press("Tab");
  await page.keyboard.press("Delete");
  expect(page.getByRole("tab", { name: "Tab 1" })).toBeVisible();
  expect(page.getByRole("tab", { name: "Tab 2" })).toBeVisible();

  // Close only removable tab
  const closeBtn = page.locator("[data-name=CloseXS]").first();
  await closeBtn.click();
  expect(await page.getByRole("tab").all()).toHaveLength(1);
  expect(await page.getByRole("tab").allTextContents()).toEqual(["Tab 1"]);
  expect(await page.locator("[data-name=CloseXS]").all()).toHaveLength(0);
});
