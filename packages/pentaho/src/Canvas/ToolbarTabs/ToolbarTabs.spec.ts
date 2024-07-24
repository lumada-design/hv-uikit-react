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

test.beforeEach(async ({ page }) => {
  page.setViewportSize({ width: 700, height: 500 });
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
  await expect(selectedTab).toHaveAttribute("aria-label", "My first tab");
  await expect(otherTab).toHaveAttribute(
    "aria-label",
    "My tab with a very long label",
  );
  expect(await page.getByRole("tab").all()).toHaveLength(2);
  expect(await page.getByRole("button", { name: "Close" }).all()).toHaveLength(
    2,
  );
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
  expect(await page.getByRole("button", { name: "Close" }).all()).toHaveLength(
    0,
  );
});

test("renames selected tab when uncontrolled", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My first tab");

  const editButton = page.getByRole("button", { name: "My first tab" });
  await editButton.click();

  const input = page.getByRole("textbox");
  await input.fill("My new label");

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My new label");
});

test("renames selected tab when controlled", async ({ page }) => {
  await goToControlledSample(page);

  // Add new tab
  const createBtn = page.getByRole("button", {
    name: "Create new",
  });
  await createBtn.click();

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "Undefined 1");

  const editButton = page.getByRole("button", { name: "Undefined 1" });
  await editButton.click();

  const input = page.getByRole("textbox");
  await input.fill("My new label");

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My new label");
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
  const editButton = page.getByRole("button", { name: "Undefined" });
  await editButton.click();
  const input = page.getByRole("textbox");
  await input.fill("My new label");

  // Not overflowing
  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My new label");
  expect(await page.getByRole("tab").all()).toHaveLength(3);

  // Add second tab
  await createBtn.click();

  // Overflowing
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "Undefined 4");
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
  let editButton = page.getByRole("button", { name: "Undefined 3" });
  await editButton.click();
  let input = page.getByRole("textbox");
  await input.fill("My new label");

  // Not overflowing
  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My new label");
  expect(await page.getByRole("tab").all()).toHaveLength(3);

  // Add fourth tab
  await createBtn.click();

  // Overflowing
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "Undefined 4");
  expect(await page.getByRole("tab").all()).toHaveLength(3);
  let dropdownMenu = page.getByRole("button", { name: "Dropdown menu" });
  await dropdownMenu.click();
  let menu = page.getByRole("menu");
  await expect(menu).toBeVisible();
  expect(await page.getByRole("menuitem").allTextContents()).toEqual([
    "My new label",
  ]);

  // Rename last tab
  editButton = page.getByRole("button", { name: "Undefined 4" });
  await editButton.click();
  input = page.getByRole("textbox");
  await input.fill("My other new label");

  // Add fifth tab
  await createBtn.click();

  // Overflowing
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "Undefined 5");
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
  await expect(selectedTab).toHaveAttribute("aria-label", "My first tab");

  // Close first tab
  let closeBtn = page.getByRole("button", { name: "Close" }).first();
  await closeBtn.click();

  const tabList = page.getByRole("tablist");
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(tabList).toBeVisible();
  await expect(selectedTab).toHaveAttribute(
    "aria-label",
    "My tab with a very long label",
  );
  expect(await page.getByRole("tab").all()).toHaveLength(1);

  // Close remaining tab
  closeBtn = page.getByRole("button", { name: "Close" }).first();
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
  await expect(selectedTab).toHaveAttribute("aria-label", "Undefined 2");

  // Close selected tab
  let closeBtn = page.getByRole("button", { name: "Close" }).nth(1);
  await closeBtn.click();

  const tabList = page.getByRole("tablist");
  selectedTab = page.getByRole("tab", { selected: true });
  await expect(tabList).toBeVisible();
  await expect(selectedTab).toHaveAttribute("aria-label", "Undefined 1");
  expect(await page.getByRole("tab").all()).toHaveLength(1);

  // Close remaining tab
  closeBtn = page.getByRole("button", { name: "Close" }).first();
  await closeBtn.click();
  expect(await page.getByRole("tab").all()).toHaveLength(0);
});

test("changes selected tab when uncontrolled", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My first tab");

  // Change selected tab
  const secondTab = page.getByRole("button", {
    name: "My tab with a very long label",
  });
  await secondTab.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute(
    "aria-label",
    "My tab with a very long label",
  );
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
  await expect(selectedTab).toHaveAttribute("aria-label", "Undefined 2");

  // Change selected tab
  const tab = page.getByRole("button", {
    name: "Undefined 1",
  });
  await tab.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "Undefined 1");
});

test("selects previous tab when tab is closed", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My first tab");

  // Change selected tab
  const secondTab = page.getByRole("button", {
    name: "My tab with a very long label",
  });
  await secondTab.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute(
    "aria-label",
    "My tab with a very long label",
  );

  // Close selected tab
  const closeBtn = page
    .getByRole("button", {
      name: "Close",
    })
    .nth(1);
  await closeBtn.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My first tab");
});

test("selects next tab when tab with no previous tab is closed", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute("aria-label", "My first tab");

  // Close selected tab
  const closeBtn = page
    .getByRole("button", {
      name: "Close",
    })
    .first();
  await closeBtn.click();

  selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toHaveAttribute(
    "aria-label",
    "My tab with a very long label",
  );
});

test("can close any tab", async ({ page }) => {
  await goToUncontrolledSample(page);

  const firstCloseBtn = page.getByRole("button", { name: "Close" }).first();
  const secondCloseBtn = page.getByRole("button", { name: "Close" }).nth(1);
  await expect(firstCloseBtn).toBeEnabled();
  await expect(secondCloseBtn).toBeEnabled();
  expect(await page.getByRole("button", { name: "Close" }).all()).toHaveLength(
    2,
  );
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
