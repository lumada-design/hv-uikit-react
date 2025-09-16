import { expect, test, type Locator, type Page } from "@playwright/test";

// Test URLs
const MAIN_FLOW_URL = "./iframe.html?args=&id=lab-flow--main&viewMode=story";
const VISUALIZATIONS_URL =
  "./iframe.html?args=&id=lab-flow--visualizations&viewMode=story";

// Predefined positions for consistent node placement
const POSITIONS = {
  LEFT: { x: 120, y: 50 },
  RIGHT: { x: 620, y: 80 },
} as const;

class FlowTestHelper {
  private page: Page;
  private flowCanvas: Locator;

  constructor(page: Page, flowCanvas: Locator) {
    this.page = page;
    this.flowCanvas = flowCanvas;
  }

  async selectNode(nodeGroup: string, nodeName: string, withExpand = false) {
    const nodeGroupLocator = this.page
      .getByRole("listitem")
      .filter({ hasText: nodeGroup });

    if (withExpand) {
      await nodeGroupLocator
        .getByRole("button", { name: "Expand Group" })
        .click();
    }

    return nodeGroupLocator.getByRole("button", { name: nodeName });
  }

  async dragNodeToPosition(node: Locator, position: { x: number; y: number }) {
    await node.dragTo(this.flowCanvas, { targetPosition: position });
  }

  async connectNodes(sourceNodeName: string, targetNodeName: string) {
    const sourceHandle = this.flowCanvas
      .getByText(sourceNodeName, { exact: true })
      .locator("xpath=ancestor::div[contains(@class, 'react-flow__node')]")
      .locator(".react-flow__handle-right")
      .first();

    const targetHandle = this.flowCanvas
      .getByText(targetNodeName, { exact: true })
      .locator("xpath=ancestor::div[contains(@class, 'react-flow__node')]")
      .locator(".react-flow__handle-left")
      .first();

    await sourceHandle.dragTo(targetHandle, { force: true });
  }

  async deleteFirstConnection() {
    await this.page
      .locator('g[role="group"][data-testid^="rf__edge-"]')
      .first()
      .click();
    await this.page.keyboard.press("Backspace");
  }

  async moveNodeUp(node: Locator, distance: number) {
    const nodeBox = await node.boundingBox();
    if (!nodeBox) throw new Error("Node not found");

    const centerX = nodeBox.x + nodeBox.width / 2;
    const centerY = nodeBox.y + nodeBox.height / 2;

    await this.page.mouse.move(centerX, centerY);
    await this.page.mouse.down();
    await this.page.mouse.move(centerX, centerY - distance);
    await this.page.mouse.up();
  }

  getEdgesLocator() {
    return this.flowCanvas.locator('g[role="group"][data-testid^="rf__edge-"]');
  }

  async createAssetToMLConnection() {
    const assetNode = await this.selectNode("Asset", "My Asset");
    await this.dragNodeToPosition(assetNode, POSITIONS.LEFT);

    const mlNode = await this.selectNode(
      "ML Model",
      "ML Model Detection",
      true,
    );
    await this.dragNodeToPosition(mlNode, POSITIONS.RIGHT);

    await this.connectNodes("My Asset", "ML Model Detection");
  }
}

let flowHelper: FlowTestHelper;

test.beforeEach(async ({ page }) => {
  const flowCanvas = page.locator(".HvFlow-root");
  flowHelper = new FlowTestHelper(page, flowCanvas);
});

test.describe("Node", () => {
  test("should allow to drag Assets node to the expected position", async ({
    page,
  }) => {
    await page.goto(MAIN_FLOW_URL);

    const elementToDrag = await flowHelper.selectNode("Asset", "My Asset");
    await expect(elementToDrag).toBeVisible();

    const elementToDragBox = await elementToDrag.boundingBox();
    const destinationX = Math.floor(elementToDragBox!.width / 2) + 10;
    const destinationY = Math.floor(elementToDragBox!.height / 2) + 30;

    await flowHelper.dragNodeToPosition(elementToDrag, {
      x: destinationX,
      y: destinationY,
    });

    const flowCanvas = page.locator(".HvFlow-root");
    const dragDestinationBox = await flowCanvas.boundingBox();
    const nodeInCanvasBox = await flowCanvas
      .getByText("Asset")
      .first()
      .boundingBox();

    // Verify node is positioned within expected bounds
    expect(nodeInCanvasBox?.x).toBeGreaterThanOrEqual(dragDestinationBox!.x);
    expect(nodeInCanvasBox?.x).toBeLessThanOrEqual(dragDestinationBox!.x + 80);
    expect(nodeInCanvasBox?.y).toBeGreaterThanOrEqual(
      dragDestinationBox!.y + 20,
    );
    expect(nodeInCanvasBox?.y).toBeLessThanOrEqual(dragDestinationBox!.y + 80);
  });

  test("should be able to duplicate a node", async ({ page }) => {
    await page.goto(MAIN_FLOW_URL);

    const node = await flowHelper.selectNode(
      "ML Model",
      "ML Model Prediction",
      true,
    );
    await flowHelper.dragNodeToPosition(node, POSITIONS.LEFT);

    const flowCanvas = page.locator(".HvFlow-root");
    const createdNode = flowCanvas.getByText("ML Model Prediction");
    await expect(createdNode).toBeVisible();

    await createdNode.hover();
    await page.getByRole("button", { name: "Duplicate" }).hover();
    await expect(
      page.getByRole("tooltip", { name: "Duplicate" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Duplicate" }).click();

    expect(await createdNode.all()).toHaveLength(2);
  });

  test("should be able to delete a node", async ({ page }) => {
    await page.goto(MAIN_FLOW_URL);

    const node = await flowHelper.selectNode(
      "ML Model",
      "ML Model Detection",
      true,
    );
    await flowHelper.dragNodeToPosition(node, POSITIONS.RIGHT);

    const flowCanvas = page.locator(".HvFlow-root");
    const createdNode = flowCanvas.getByText("ML Model Detection");
    await expect(createdNode).toBeVisible();

    await createdNode.first().hover();
    await flowCanvas.getByRole("button", { name: "Delete" }).hover();
    await expect(page.getByRole("tooltip", { name: "Delete" })).toBeVisible();
    await flowCanvas.getByRole("button", { name: "Delete" }).click();

    await expect(createdNode).not.toBeVisible();
    await expect(flowCanvas.getByText("Empty Flow")).toBeVisible();
  });
});

test.describe("Connections", () => {
  test("should be able to connect two nodes", async ({ page }) => {
    await page.goto(MAIN_FLOW_URL);

    await flowHelper.createAssetToMLConnection();

    const edges = flowHelper.getEdgesLocator();
    await expect(edges).toHaveCount(1);
  });

  test("should be able to delete a connection", async ({ page }) => {
    await page.goto(MAIN_FLOW_URL);

    await flowHelper.createAssetToMLConnection();

    const edges = flowHelper.getEdgesLocator();
    await expect(edges).toHaveCount(1);

    await flowHelper.deleteFirstConnection();
    await expect(edges).toHaveCount(0);
  });

  test("should not be able to connect incompatible nodes", async ({ page }) => {
    await page.goto(MAIN_FLOW_URL);

    // Use two ML Model nodes that can't connect to each other
    const mlNode1 = await flowHelper.selectNode(
      "ML Model",
      "ML Model Detection",
      true,
    );
    await flowHelper.dragNodeToPosition(mlNode1, POSITIONS.LEFT);

    const mlNode2 = await flowHelper.selectNode(
      "ML Model",
      "ML Model Prediction",
    );
    await flowHelper.dragNodeToPosition(mlNode2, POSITIONS.RIGHT);

    await flowHelper.connectNodes("ML Model Detection", "ML Model Prediction");

    const edges = flowHelper.getEdgesLocator();
    await expect(edges).toHaveCount(0);
  });

  test("flow allows multiple connections", async ({ page }) => {
    await page.goto(MAIN_FLOW_URL);

    await flowHelper.createAssetToMLConnection();

    const edges = flowHelper.getEdgesLocator();
    await expect(edges).toHaveCount(1);
  });

  test("connector should respect the maximum number of connections allowed", async ({
    page,
  }) => {
    await page.goto(VISUALIZATIONS_URL, { waitUntil: "networkidle" });

    const edges = flowHelper.getEdgesLocator();
    await expect(edges).toHaveCount(4); // Wait for the 4 initial edges to load

    const numberConnections = await edges.count();
    await expect(edges).toHaveCount(numberConnections); // Should have 4 edges

    await flowHelper.deleteFirstConnection();
    await expect(edges).toHaveCount(numberConnections - 1); // Should have 3 edges
  });
});

test.describe("Interactive button", () => {
  test("should not be able to drag nodes after interactive button is locked", async ({
    page,
  }) => {
    await page.goto(VISUALIZATIONS_URL);

    const flowCanvas = page.locator(".HvFlow-root");
    const inputNode = flowCanvas.locator('[data-id="jsonInput"]').first();
    const lineChartNode = flowCanvas.locator('[data-id="lineChart"]').first();

    let inputBox = await inputNode.boundingBox();
    let lineChartBox = await lineChartNode.boundingBox();
    const initialDiff = inputBox!.y - lineChartBox!.y;

    // Test dragging before interactive mode
    await flowHelper.moveNodeUp(inputNode, 50);
    inputBox = await inputNode.boundingBox();
    lineChartBox = await lineChartNode.boundingBox();

    const newDiff = inputBox!.y - lineChartBox!.y;
    expect(Math.abs(newDiff - (initialDiff - 50))).toBeLessThanOrEqual(60);

    // Enable interactive mode
    await page.getByRole("button", { name: "Interactive" }).click();

    // Test dragging after interactive mode (should not move)
    const beforeInteractiveDiff = inputBox!.y - lineChartBox!.y;
    await flowHelper.moveNodeUp(inputNode, 50);

    inputBox = await inputNode.boundingBox();
    lineChartBox = await lineChartNode.boundingBox();
    const afterInteractiveDiff = inputBox!.y - lineChartBox!.y;

    expect(
      Math.abs(afterInteractiveDiff - beforeInteractiveDiff),
    ).toBeLessThanOrEqual(5);
  });

  test("should not be able to duplicate/delete nodes after interactive button is locked", async ({
    page,
  }) => {
    await page.goto(MAIN_FLOW_URL);

    const node = await flowHelper.selectNode(
      "ML Model",
      "ML Model Prediction",
      true,
    );
    await flowHelper.dragNodeToPosition(node, POSITIONS.LEFT);

    const flowCanvas = page.locator(".HvFlow-root");
    const createdNode = flowCanvas.getByText("ML Model Prediction").first();
    const nodeBox = await createdNode.boundingBox();

    // Test buttons are visible before interactive mode
    await page.mouse.move(nodeBox!.x + 30, nodeBox!.y + 30);
    await expect(page.getByRole("button", { name: "Duplicate" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

    // Enable interactive mode
    await page.getByRole("button", { name: "Interactive" }).click();

    // Test buttons are hidden after interactive mode
    await page.mouse.move(nodeBox!.x + 30, nodeBox!.y + 30);
    await expect(
      page.getByRole("button", { name: "Duplicate" }),
    ).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Delete" }),
    ).not.toBeVisible();
  });
});
