import { describe, expect, it } from "vitest";

import { NodeTreeNavigationUtils } from "../utils";

describe("NodeTreeNavigationUtils", () => {
  const nodeMap = {
    [-1]: {
      children: ["A", "B", "C"],
    },
    A: {
      parent: -1,
      children: ["A1", "A2", "A3"],
      label: "a",
    },
    A1: {
      parent: "A",
      label: "d",
    },
    A2: {
      parent: "A",
      label: "e",
    },
    A3: {
      parent: "A",
      children: ["A3a", "A3b", "A3c"],
      label: "f",
    },
    A3a: {
      parent: "A3",
      label: "i",
    },
    A3b: {
      parent: "A3",
      label: "b",
    },
    A3c: {
      parent: "A3",
      label: "j",
    },
    B: {
      parent: -1,
      label: "b",
    },
    C: {
      parent: -1,
      children: ["C1", "C2", "C3"],
      label: "c",
    },
    C1: {
      parent: "C",
      label: "g",
    },
    C2: {
      parent: "C",
      label: "g",
    },
    C3: {
      parent: "C",
      label: "h",
    },
  };

  describe("getNextNode", () => {
    it("no children, should return next sibling", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNextNode(() => false, nodeMap, "B");

      expect(foundNodeId).toEqual("C");
    });

    it("with children but collapsed, should return next sibling", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNextNode(() => false, nodeMap, "A");

      expect(foundNodeId).toEqual("B");
    });

    it("with children and expanded, should return first child", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNextNode(
        (nodeId) => nodeId === "A",
        nodeMap,
        "A"
      );

      expect(foundNodeId).toEqual("A1");
    });

    it("if last child, should return parent's next sibling", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNextNode(() => false, nodeMap, "A3");

      expect(foundNodeId).toEqual("B");
    });

    it("if last grandchild, should return grandparent's next sibling", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNextNode(() => false, nodeMap, "A3c");

      expect(foundNodeId).toEqual("B");
    });
  });

  describe("getPreviousNode", () => {
    it("if first child, should return its parent", () => {
      const foundNodeId = NodeTreeNavigationUtils.getPreviousNode(
        (nodeId) => nodeId === "A",
        nodeMap,
        "A1"
      );

      expect(foundNodeId).toEqual("A");
    });

    it("if previous sibling has no children, should return it", () => {
      const foundNodeId = NodeTreeNavigationUtils.getPreviousNode(() => false, nodeMap, "C");

      expect(foundNodeId).toEqual("B");
    });

    it("if previous sibling has children but is collapsed, should return it", () => {
      const foundNodeId = NodeTreeNavigationUtils.getPreviousNode(() => false, nodeMap, "B");

      expect(foundNodeId).toEqual("A");
    });

    it("if previous sibling has children and is expanded, should return its last child", () => {
      const foundNodeId = NodeTreeNavigationUtils.getPreviousNode(
        (nodeId) => nodeId === "A",
        nodeMap,
        "B"
      );

      expect(foundNodeId).toEqual("A3");
    });

    it("if previous sibling has grandchildren but its last child is collapsed, should return the last child", () => {
      const foundNodeId = NodeTreeNavigationUtils.getPreviousNode(
        (nodeId) => nodeId === "A",
        nodeMap,
        "B"
      );

      expect(foundNodeId).toEqual("A3");
    });

    it("if previous sibling has grandchildren and is expanded, should return its last grandchild", () => {
      const foundNodeId = NodeTreeNavigationUtils.getPreviousNode(
        (nodeId) => nodeId === "A" || nodeId === "A3",
        nodeMap,
        "B"
      );

      expect(foundNodeId).toEqual("A3c");
    });
  });

  describe("getLastNode", () => {
    it("if last top node is collapsed or childless, return last node", () => {
      const foundNodeId = NodeTreeNavigationUtils.getLastNode(() => false, nodeMap);

      expect(foundNodeId).toEqual("C");
    });

    it("if last top node is expanded, return last child", () => {
      const foundNodeId = NodeTreeNavigationUtils.getLastNode((nodeId) => nodeId === "C", nodeMap);

      expect(foundNodeId).toEqual("C3");
    });

    it("if collapsed, return itself", () => {
      const foundNodeId = NodeTreeNavigationUtils.getLastNode(() => false, nodeMap, "A");

      expect(foundNodeId).toEqual("A");
    });

    it("if childless, return itself", () => {
      const foundNodeId = NodeTreeNavigationUtils.getLastNode(() => false, nodeMap, "B");

      expect(foundNodeId).toEqual("B");
    });

    it("if expanded, return its last child", () => {
      const foundNodeId = NodeTreeNavigationUtils.getLastNode(
        (nodeId) => nodeId === "A",
        nodeMap,
        "A"
      );

      expect(foundNodeId).toEqual("A3");
    });

    it("if last child is expanded, return the last grandchild", () => {
      const foundNodeId = NodeTreeNavigationUtils.getLastNode(
        (nodeId) => nodeId === "A" || nodeId === "A3",
        nodeMap,
        "A"
      );

      expect(foundNodeId).toEqual("A3c");
    });
  });

  describe("getNodeByFirstCharacter", () => {
    it("if not found, should return null", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "A3a", "A3b", "A3c", "B", "C", "C1", "C2", "C3"],
        "A",
        "z"
      );

      expect(foundNodeId).toBeNull();
    });

    it("if not found because not visible, should return null", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "B", "C", "C1", "C2", "C3"],
        "A",
        "j"
      );

      expect(foundNodeId).toBeNull();
    });

    it("if found should return it", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "A3a", "A3b", "A3c", "B", "C", "C1", "C2", "C3"],
        "A",
        "j"
      );

      expect(foundNodeId).toEqual("A3c");
    });

    it("if found should return it (uppercase)", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "A3a", "A3b", "A3c", "B", "C", "C1", "C2", "C3"],
        "A",
        "J"
      );

      expect(foundNodeId).toEqual("A3c");
    });

    it("if multiple should return first after current node", () => {
      let foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "A3a", "A3b", "A3c", "B", "C", "C1", "C2", "C3"],
        "A",
        "b"
      );

      expect(foundNodeId).toEqual("A3b");

      foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "A3a", "A3b", "A3c", "B", "C", "C1", "C2", "C3"],
        "A3c",
        "b"
      );

      expect(foundNodeId).toEqual("B");
    });

    it("must not return current node", () => {
      let foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "A3a", "A3b", "A3c", "B", "C", "C1", "C2", "C3"],
        "C1",
        "g"
      );

      expect(foundNodeId).toEqual("C2");

      foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "A3a", "A3b", "A3c", "B", "C", "C1", "C2", "C3"],
        "A3a",
        "i"
      );

      expect(foundNodeId).toBeNull();
    });

    it("should start from top if not found after current node", () => {
      const foundNodeId = NodeTreeNavigationUtils.getNodeByFirstCharacter(
        nodeMap,
        ["A", "A1", "A2", "A3", "A3a", "A3b", "A3c", "B", "C", "C1", "C2", "C3"],
        "C",
        "d"
      );

      expect(foundNodeId).toEqual("A1");
    });
  });
});
