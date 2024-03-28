import { describe, expect, it } from "vitest";

import { NodeTreeMapUtils } from ".";

describe("NodeTreeMapUtils", () => {
  let nodeMap;

  beforeEach(() => {
    nodeMap = {
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
  });

  describe("addNodeToNodeMap", () => {
    it("should add", () => {
      const result = NodeTreeMapUtils.addNodeToNodeMap(
        nodeMap,
        "Z",
        ["Z1", "Z2"],
        {
          label: "Z",
          path: "something",
        },
      );

      expect(Object.is(nodeMap, result)).toBe(false);
      expect(result).toEqual({
        ...nodeMap,
        ...{
          Z: {
            label: "Z",
            path: "something",
            children: ["Z1", "Z2"],
          },
          Z1: {
            parent: "Z",
          },
          Z2: {
            parent: "Z",
          },
        },
      });
    });
  });

  describe("removeNodeFromNodeMap", () => {
    it("should remove if exists", () => {
      const result = NodeTreeMapUtils.removeNodeFromNodeMap(nodeMap, "C2");

      expect(Object.is(nodeMap, result)).toBe(false);
      expect(result.C2).toEqual(undefined);
      expect(result.C.children.sort()).toEqual(["C1", "C3"]);
    });

    it("should do nothing if not exists", () => {
      const result = NodeTreeMapUtils.removeNodeFromNodeMap(nodeMap, "Z");

      expect(Object.is(nodeMap, result)).toBe(true);
    });
  });
});
