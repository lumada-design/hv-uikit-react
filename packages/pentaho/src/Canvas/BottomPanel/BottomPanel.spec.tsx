import { expect, test, type Page } from "@playwright/test";

// Playwright tests were added because unit tests were not working properly since the
// component's layout changes according with the screen width

const hideExtraTests = async (page: Page) => {
  const btn = page.getByRole("button", { name: "Toggle Extra Tests" });
  await btn.click();
};

const goToControlledSample = async (page: Page) => {
  page.goto("./iframe.html?args=&id=pentaho-canvas--test&viewMode=story");
  await hideExtraTests(page);
};

const goToUncontrolledSample = async (page: Page) =>
  page.goto(
    "./iframe.html?args=&id=pentaho-canvas-bottom-panel--main&viewMode=story",
  );

test.beforeEach(async ({ page }) => {
  page.setViewportSize({ width: 800, height: 500 });
});

test("opens and closes by controlling the component and renders correctly when closed", async ({
  page,
}) => {
  await goToControlledSample(page);

  // Close panel
  const toggleBtn = page.getByRole("button", { name: "Toggle Open" });
  await toggleBtn.click();

  const tabList = page.getByRole("tablist");
  const tabPanel = page.getByRole("tabpanel");
  await expect(tabList).toBeHidden();
  await expect(tabPanel).toBeHidden();
});

test("renders correctly when opened", async ({ page }) => {
  await goToControlledSample(page);

  const tabList = page.getByRole("tablist");
  const tabPanel = page.getByRole("tabpanel");
  const selectedTab = page.getByRole("tab", { selected: true });
  await expect(tabList).toBeVisible();
  await expect(tabPanel).toBeVisible();
  await expect(tabPanel).toContainText("Content");
  await expect(selectedTab).toContainText("Tab 1");
  expect(await page.getByRole("tab", { selected: false }).all()).toHaveLength(
    1,
  );
  expect(await page.getByRole("tab").all()).toHaveLength(2);
  expect(await page.getByRole("tab").allTextContents()).toEqual([
    "Tab 1",
    "Tab 2",
  ]);
});

test("minimizes and maximizes the tabs by controlling the component", async ({
  page,
}) => {
  await goToControlledSample(page);

  let tabList = page.getByRole("tablist");
  let tabPanel = page.getByRole("tabpanel");
  await expect(tabList).toBeVisible();
  await expect(tabPanel).toBeVisible();

  // Minimize tabs
  const minimizeBtn = page.getByRole("button", { name: "Toggle Minimize" });
  await minimizeBtn.click();

  tabList = page.getByRole("tablist");
  tabPanel = page.getByRole("tabpanel");
  await expect(tabList).toBeVisible();
  await expect(tabPanel).toBeHidden();
});

test("renders the correct number of right and left actions", async ({
  page,
}) => {
  await goToControlledSample(page);

  expect(
    await page.getByRole("button", { name: "Dropdown menu" }).all(),
  ).toHaveLength(4);
  expect(
    await page.getByRole("button", { name: "Action 1" }).all(),
  ).toHaveLength(2);
  expect(
    await page.getByRole("button", { name: "Action 3" }).all(),
  ).toHaveLength(2);
  expect(
    await page.getByRole("button", { name: "Action 4" }).all(),
  ).toHaveLength(2);

  // Click left action for first tab
  const leftDropdownMenu = page
    .getByRole("button", { name: "Dropdown menu" })
    .first();
  await leftDropdownMenu.click();
  const leftMenu = page.getByRole("menu");
  await expect(leftMenu).toBeVisible();
  expect(await page.getByRole("menuitem").all()).toHaveLength(1);
  expect(await page.getByRole("menuitem").allTextContents()).toEqual([
    "Action 2",
  ]);

  // Click right action for first tab
  const rightDropdownMenu = page
    .getByRole("button", { name: "Dropdown menu" })
    .nth(1);
  await rightDropdownMenu.click();
  const rightMenu = page.getByRole("menu");
  await expect(rightMenu).toBeVisible();
  expect(await page.getByRole("menuitem").all()).toHaveLength(1);
  expect(await page.getByRole("menuitem").allTextContents()).toEqual([
    "Action 5",
  ]);
});

test("switches the selected tab when controlled", async ({ page }) => {
  await goToControlledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  let unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 1");
  await expect(unSelectedTab).toContainText("Tab 2");

  await unSelectedTab.click();

  selectedTab = page.getByRole("tab", { selected: true });
  unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 2");
  await expect(unSelectedTab).toContainText("Tab 1");
});

test("switches the selected tab when uncontrolled", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  let unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 1");
  await expect(unSelectedTab).toContainText("Tab 2");

  await unSelectedTab.click();

  selectedTab = page.getByRole("tab", { selected: true });
  unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 2");
  await expect(unSelectedTab).toContainText("Tab 1");
});

test("switches the selected tab when using the keyboard", async ({ page }) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  let unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 1");
  await expect(unSelectedTab).toContainText("Tab 2");

  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowRight");
  selectedTab = page.getByRole("tab", { selected: true });
  unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 2");
  await expect(unSelectedTab).toContainText("Tab 1");

  await page.keyboard.press("ArrowLeft");
  selectedTab = page.getByRole("tab", { selected: true });
  unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 1");
  await expect(unSelectedTab).toContainText("Tab 2");
});

test("doesn't switch the selected tab when only using the tab key to navigate", async ({
  page,
}) => {
  await goToUncontrolledSample(page);

  let selectedTab = page.getByRole("tab", { selected: true });
  let unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 1");
  await expect(unSelectedTab).toContainText("Tab 2");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  selectedTab = page.getByRole("tab", { selected: true });
  unSelectedTab = page.getByRole("tab", { selected: false });
  await expect(selectedTab).toContainText("Tab 1");
  await expect(unSelectedTab).toContainText("Tab 2");
});

test("render overflow actions when the tab content is overflowing", async ({
  page,
}) => {
  // Change viewport
  page.setViewportSize({ width: 200, height: 500 });

  await goToControlledSample(page);

  // Open panel
  const toggleBtn = page.getByRole("button", { name: "Toggle Open" });
  await toggleBtn.click();

  const selectedTab = page.getByRole("tab", { selected: true });
  await expect(selectedTab).toContainText("Tab 1 Overflowing");
  expect(
    await page.getByRole("button", { name: "Dropdown menu" }).all(),
  ).toHaveLength(2);

  // Click action for first tab
  const dropdownMenu = page
    .getByRole("button", { name: "Dropdown menu" })
    .first();
  await dropdownMenu.click();
  const menu = page.getByRole("menu");
  await expect(menu).toBeVisible();
  expect(await page.getByRole("menuitem").all()).toHaveLength(5);
  expect(await page.getByRole("menuitem").allTextContents()).toEqual([
    "Action 1",
    "Action 2",
    "Action 3",
    "Action 4",
    "Action 5",
  ]);
});
