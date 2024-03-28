import { expect, test, type Locator, type Page } from "@playwright/test";

let flowCanvasLocator: Locator;
let referencePage: Page;

async function selectNode(
  nodeGroup: string,
  nodeName: string,
  withExpand: boolean,
) {
  const baseAssetNodeLocator = referencePage
    .getByRole("listitem")
    .filter({ hasText: nodeGroup });
  if (withExpand) {
    await baseAssetNodeLocator
      .getByRole("button", { name: "Expand Group" })
      .click();
  }
  return baseAssetNodeLocator.getByRole("button", { name: nodeName });
}

async function dragToPosition1(node: Locator) {
  await node.dragTo(flowCanvasLocator, { targetPosition: { x: 120, y: 50 } });
}

async function dragToPosition2(node: Locator) {
  await node.dragTo(flowCanvasLocator, { targetPosition: { x: 130, y: 400 } });
}

async function dragToPosition3(node: Locator) {
  await node.dragTo(flowCanvasLocator, { targetPosition: { x: 620, y: 80 } });
}

async function connectNodes(
  sourceNode: string,
  sourceConnection: string,
  targetNode: string,
  targetConnection: string,
) {
  const source = flowCanvasLocator
    .getByRole("button", { name: sourceNode })
    .locator(".react-flow__handle-right")
    .filter({
      has: referencePage
        .locator("../div")
        .getByText(sourceConnection, { exact: true }),
    });
  const target = flowCanvasLocator
    .getByRole("button", { name: targetNode })
    .locator(".react-flow__handle-left")
    .filter({
      has: referencePage
        .locator("../div")
        .getByText(targetConnection, { exact: true }),
    });
  await source.dragTo(target, { force: true });
}

async function deleteConnection(connectionName: string) {
  await referencePage.getByRole("button", { name: connectionName }).click();
  await referencePage.keyboard.press("Backspace");
}

async function moveUp(renderedNode: Locator, verticalMovement: number) {
  const renderedNodeBox = await renderedNode.boundingBox();
  const initialPointX = renderedNodeBox!.x + 30;
  const initialPointY = renderedNodeBox!.y + 30;
  await referencePage.mouse.move(initialPointX, initialPointY);
  await referencePage.mouse.down();
  await referencePage.mouse.move(
    initialPointX,
    initialPointY - verticalMovement,
  );
  await referencePage.mouse.up();
}

test.beforeEach(async ({ page }) => {
  referencePage = page;
  flowCanvasLocator = page.locator(".HvFlow-root");
});

test.describe("Node", () => {
  test("should allow to drag Assets node to the expected position", async ({
    page,
  }) => {
    await page.goto("./iframe.html?args=&id=lab-flow--main&viewMode=story");
    await page.getByRole("button", { name: "Add Node" }).click();

    const baseAssetNodeLocator = page
      .getByRole("listitem")
      .filter({ hasText: "Asset" });
    await baseAssetNodeLocator
      .getByRole("button", { name: "Expand Group" })
      .click();

    const elementToDrag = baseAssetNodeLocator.getByRole("button", {
      name: "My Asset",
    });
    const elementToDragBox = await elementToDrag.boundingBox();

    await expect(elementToDrag).toBeVisible();
    const destinationX = Math.floor(elementToDragBox!.width / 2) + 10;
    const destinationY = Math.floor(elementToDragBox!.height / 2) + 30;
    await elementToDrag.dragTo(flowCanvasLocator, {
      targetPosition: { x: destinationX, y: destinationY },
    });

    const dragDestinationBox = await flowCanvasLocator.boundingBox();
    const nodeInCanvasBox = await flowCanvasLocator
      .getByRole("button", { name: "Asset" })
      .boundingBox();

    /* expect(nodeInCanvasBox?.x).toEqual(dragDestinationBox!.x + 10);
    expect(nodeInCanvasBox?.y).toEqual(dragDestinationBox!.y + 10); */

    expect(nodeInCanvasBox?.x).toBeGreaterThanOrEqual(dragDestinationBox!.x);
    expect(nodeInCanvasBox?.x).toBeLessThanOrEqual(dragDestinationBox!.x + 20);
    expect(nodeInCanvasBox?.y).toBeGreaterThanOrEqual(
      dragDestinationBox!.y + 20,
    );
    expect(nodeInCanvasBox?.y).toBeLessThanOrEqual(dragDestinationBox!.y + 40);
  });

  test("should be able to duplicate a node", async ({ page }) => {
    await page.goto("./iframe.html?args=&id=lab-flow--main&viewMode=story");
    await page.getByRole("button", { name: "Add Node" }).click();

    const node = await selectNode("ML Model", "ML Model Prediction", true);
    await dragToPosition1(node);

    const createdNode = flowCanvasLocator.getByRole("button", {
      name: "ML Model Prediction",
    });
    expect(await createdNode.all()).toHaveLength(1);
    await flowCanvasLocator
      .getByRole("button", { name: "ML Model Prediction" })
      .hover();
    await page.getByRole("button", { name: "Duplicate" }).hover();
    await expect(
      page.getByRole("tooltip", { name: "Duplicate" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Duplicate" }).click();
    expect(await createdNode.all()).toHaveLength(2);
  });

  test("should be able to delete a node", async ({ page }) => {
    await page.goto("./iframe.html?args=&id=lab-flow--main&viewMode=story");
    await page.getByRole("button", { name: "Add Node" }).click();

    const node = await selectNode("ML Model", "ML Model Detection", true);
    await dragToPosition3(node);

    const createdNode = flowCanvasLocator.getByRole("button", {
      name: "ML Model Detection",
    });
    expect(await createdNode.all()).toHaveLength(1);
    await flowCanvasLocator
      .getByRole("button", { name: "ML Model Detection" })
      .hover();
    await flowCanvasLocator.getByRole("button", { name: "Delete" }).hover();
    await expect(page.getByRole("tooltip", { name: "Delete" })).toBeVisible();
    await flowCanvasLocator.getByRole("button", { name: "Delete" }).click();
    await expect(createdNode).not.toBeVisible();
    await expect(flowCanvasLocator.getByText("Empty Flow")).toBeVisible();
  });
});

test.describe("Connections", () => {
  test("should be able to connect two nodes", async ({ page }) => {
    await page.goto("./iframe.html?args=&id=lab-flow--main&viewMode=story");
    await page.getByRole("button", { name: "Add Node" }).click();

    const mlNode = await selectNode("ML Model", "ML Model Detection", true);
    await dragToPosition1(mlNode);
    const kpiNode = await selectNode("Insight", "KPI", true);
    await dragToPosition3(kpiNode);

    /* await flowCanvasLocator.getByRole("button", {name: "ML Model Detection"}).locator(".react-flow__handle-right").hover();
    await page.waitForTimeout(20000);
    await page.mouse.down();
    const destination = flowCanvasLocator.getByRole("button", {name: "KPI"}).locator(".react-flow__handle-left");
    const destinationBox = await destination.boundingBox();
    await page.mouse.move(destinationBox!.x - 10, destinationBox!.y, {steps: 20});
    await page.waitForTimeout(20000);
    await destination.hover();
    await page.mouse.move(destinationBox!.x - 30, destinationBox!.y);
    await destination.hover();
    // await page.waitForTimeout(2000);
    expect (await destination.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background-color') })).toEqual("rgb(215, 230, 207)");
    await expect(destination).toHaveCSS("background-color", "rgb(215, 230, 207)");
    await page.mouse.up(); 
    
    
    // await expect(destination).toHaveCSS("background-color", "rgb(153, 153, 153)"); */

    await expect(
      flowCanvasLocator.getByRole("button", { name: "Edge" }),
    ).not.toBeVisible();
    await connectNodes("ML Model Detection", "Detection", "KPI", "Data");
    await expect(
      flowCanvasLocator.getByRole("button", { name: "Edge" }),
    ).toBeVisible();
  });

  test("should be able to delete a connection", async ({ page }) => {
    await page.goto("./iframe.html?args=&id=lab-flow--main&viewMode=story");
    await page.getByRole("button", { name: "Add Node" }).click();

    const assetNode = await selectNode("Dashboard", "Dashboard", true);
    await dragToPosition1(assetNode);
    const lineChartNode = await selectNode("Insight", "Table", true);
    await dragToPosition3(lineChartNode);

    await connectNodes("Table", "Insight", "Dashboard", "Insights");
    await expect(
      flowCanvasLocator.getByRole("button", { name: "Edge" }),
    ).toBeVisible();
    await deleteConnection("Edge");
    await expect(
      flowCanvasLocator.getByRole("button", { name: "Edge" }),
    ).not.toBeVisible();
  });

  test("should not be able to connect incompatible nodes", async ({ page }) => {
    await page.goto("./iframe.html?args=&id=lab-flow--main&viewMode=story");
    await page.getByRole("button", { name: "Add Node" }).click();

    const assetNode = await selectNode("Asset", "My Asset", true);
    await dragToPosition1(assetNode);
    const lineChartNode = await selectNode("Insight", "LineChart", true);
    await dragToPosition3(lineChartNode);

    await connectNodes("My Asset", "Sensor Group 2", "LineChart", "Data");
    await expect(
      flowCanvasLocator.getByRole("button", { name: "Edge" }),
    ).not.toBeVisible();
  });

  test("flow allows multiple connections", async ({ page }) => {
    await page.goto("./iframe.html?args=&id=lab-flow--main&viewMode=story");
    await page.getByRole("button", { name: "Add Node" }).click();

    const mlNode1 = await selectNode("Insight", "Table", true);
    await dragToPosition1(mlNode1);
    const mlNode2 = await selectNode("Insight", "KPI", false);
    await dragToPosition2(mlNode2);
    const tableNode = await selectNode("Dashboard", "Dashboard", true);
    await dragToPosition3(tableNode);

    await connectNodes("KPI", "Insight", "Dashboard", "Insights");
    await expect(
      flowCanvasLocator.getByRole("button", { name: "Edge" }),
    ).toBeVisible();
    await connectNodes("Table", "Insight", "Dashboard", "Insights");
    expect(
      await flowCanvasLocator.getByRole("button", { name: "Edge" }).all(),
    ).toHaveLength(2);
    await connectNodes("Table", "Insight", "Dashboard", "Table 1");
    expect(
      await flowCanvasLocator.getByRole("button", { name: "Edge" }).all(),
    ).toHaveLength(3);
  });

  test("connector should respect the maximum number of connections allowed", async ({
    page,
  }) => {
    await page.goto(
      "./iframe.html?args=&id=lab-flow--visualizations&viewMode=story",
      { waitUntil: "networkidle" },
    );

    await expect(
      flowCanvasLocator.getByRole("button", {
        name: "Edge from jsonInput to lineChart",
      }),
    ).toBeVisible(); // This more meaningfull name occurs in this sample but not on the other tried on this file. Should we adapt the other sample?
    const numberConnections = (
      await flowCanvasLocator.getByRole("button", { name: "Edge" }).all()
    ).length;

    await connectNodes("Filter", "Filtered Data", "Line Chart", "Data");
    expect(
      await flowCanvasLocator.getByRole("button", { name: "Edge" }).all(),
    ).toHaveLength(numberConnections);
    await deleteConnection("Edge from jsonInput to lineChart");
    expect(
      await flowCanvasLocator.getByRole("button", { name: "Edge" }).all(),
    ).toHaveLength(numberConnections - 1);
    await connectNodes("Filter", "Filtered Data", "Line Chart", "Data");
    expect(
      await flowCanvasLocator.getByRole("button", { name: "Edge" }).all(),
    ).toHaveLength(numberConnections);
  });

  /* test('copying a flow does not copy its connections?', async () => {
  });

  test('deleting a flow should delete its connections?', async () => {
  }); */
});

test.describe("Interactive button", () => {
  test("should not be able to drag nodes after interactive button is locked", async ({
    page,
  }) => {
    await page.goto(
      "./iframe.html?args=&id=lab-flow--visualizations&viewMode=story",
    );

    const inputNode = flowCanvasLocator.getByRole("button", {
      name: "Json Input",
    });
    let inputBox = await inputNode.boundingBox();
    let lineChartBox = await flowCanvasLocator
      .getByRole("button", { name: "Line Chart" })
      .boundingBox();

    let inputLineChartDiff = inputBox!.y - lineChartBox!.y;
    await moveUp(inputNode, 50);
    inputBox = await inputNode.boundingBox();
    lineChartBox = await flowCanvasLocator
      .getByRole("button", { name: "Line Chart" })
      .boundingBox();
    expect(Math.floor(inputBox!.y - lineChartBox!.y)).toEqual(
      Math.floor(inputLineChartDiff - 50),
    );

    await page.getByRole("button", { name: "Interactive" }).click();

    inputLineChartDiff = inputBox!.y - lineChartBox!.y;
    await moveUp(inputNode, 50);
    inputBox = await inputNode.boundingBox();
    lineChartBox = await flowCanvasLocator
      .getByRole("button", { name: "Line Chart" })
      .boundingBox();
    expect(Math.floor(inputBox!.y - lineChartBox!.y)).toEqual(
      Math.floor(inputLineChartDiff),
    );
  });

  test("should not be able to duplicate/delete nodes after interactive button is locked", async ({
    page,
  }) => {
    await page.goto("./iframe.html?args=&id=lab-flow--main&viewMode=story");
    await page.getByRole("button", { name: "Add Node" }).click();

    const node = await selectNode("ML Model", "ML Model Prediction", true);
    await dragToPosition1(node);

    const nodeBox = await flowCanvasLocator
      .getByRole("button", { name: "ML Model Prediction" })
      .boundingBox();
    await page.mouse.move(nodeBox!.x + 30, nodeBox!.y + 30);
    await expect(page.getByRole("button", { name: "Duplicate" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Delete" })).toBeVisible();

    await page.getByRole("button", { name: "Interactive" }).click();

    await page.mouse.move(nodeBox!.x + 30, nodeBox!.y + 30);
    await expect(
      page.getByRole("button", { name: "Duplicate" }),
    ).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Delete" }),
    ).not.toBeVisible();
  });

  /* test('fit to view button?', async () => {
  }); */
});
