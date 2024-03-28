import { describe, expect, it } from "vitest";

import { NodeTreeExpandUtils } from ".";

describe("NodeTreeExpandUtils", () => {
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

  describe("isExpanded", () => {
    it("return true if present", () => {
      const result = NodeTreeExpandUtils.isExpanded(["A", "A3", "C"], "A3");

      expect(result).toEqual(true);
    });

    it("return false if not present", () => {
      const result = NodeTreeExpandUtils.isExpanded(["A", "A3", "C"], "B");

      expect(result).toEqual(false);
    });
  });

  describe("toggle", () => {
    it("remove if present", () => {
      const expanded = ["A", "A3", "C"];
      const result = NodeTreeExpandUtils.toggle(expanded, "A3");

      expect(Object.is(expanded, result)).toBe(false);
      expect(result.sort()).toEqual(["A", "C"]);
    });

    it("add if not present", () => {
      const expanded = ["A", "A3", "C"];
      const result = NodeTreeExpandUtils.toggle(expanded, "C3");

      expect(Object.is(expanded, result)).toBe(false);
      expect(result.sort()).toEqual(["A", "A3", "C", "C3"]);
    });
  });

  describe("expandAllSiblings", () => {
    it("at root", () => {
      const expanded = [];
      const result = NodeTreeExpandUtils.expandAllSiblings(
        expanded,
        nodeMap,
        "A",
      );

      expect(Object.is(expanded, result)).toBe(false);
      expect(result.sort()).toEqual(["A", "C"]);
    });

    it("not at root", () => {
      const expanded = ["A", "C"];
      const result = NodeTreeExpandUtils.expandAllSiblings(
        expanded,
        nodeMap,
        "A1",
      );

      expect(Object.is(expanded, result)).toBe(false);
      expect(result.sort()).toEqual(["A", "A3", "C"]);
    });

    it("nothing happens if already expanded", () => {
      const expanded = ["A", "A3", "C"];
      const result = NodeTreeExpandUtils.expandAllSiblings(
        expanded,
        nodeMap,
        "A1",
      );

      expect(Object.is(expanded, result)).toBe(true);
    });
  });

  describe("getVisibleNodes", () => {
    it("all collapsed", () => {
      const result = NodeTreeExpandUtils.getVisibleNodes([], nodeMap);

      expect(result.sort()).toEqual(["A", "B", "C"]);
    });

    it("child expanded", () => {
      const result = NodeTreeExpandUtils.getVisibleNodes(["A"], nodeMap);

      expect(result.sort()).toEqual(["A", "A1", "A2", "A3", "B", "C"]);
    });

    it("grandchild expanded", () => {
      const result = NodeTreeExpandUtils.getVisibleNodes(["A", "A3"], nodeMap);

      expect(result.sort()).toEqual([
        "A",
        "A1",
        "A2",
        "A3",
        "A3a",
        "A3b",
        "A3c",
        "B",
        "C",
      ]);
    });

    it("all expanded", () => {
      const result = NodeTreeExpandUtils.getVisibleNodes(
        ["A", "A3", "C"],
        nodeMap,
      );

      expect(result.sort()).toEqual([
        "A",
        "A1",
        "A2",
        "A3",
        "A3a",
        "A3b",
        "A3c",
        "B",
        "C",
        "C1",
        "C2",
        "C3",
      ]);
    });

    it("all non-collapsible", () => {
      const result = NodeTreeExpandUtils.getVisibleNodes(true, nodeMap);

      expect(result.sort()).toEqual([
        "A",
        "A1",
        "A2",
        "A3",
        "A3a",
        "A3b",
        "A3c",
        "B",
        "C",
        "C1",
        "C2",
        "C3",
      ]);
    });
  });
});
