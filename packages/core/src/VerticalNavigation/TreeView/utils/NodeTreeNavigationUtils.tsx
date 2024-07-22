export class NodeTreeNavigationUtils {
  static getNextNode(
    isExpanded: any,
    nodeMap: any,
    nodeId: any,
    end = false,
  ): any {
    const node = nodeMap[nodeId];
    const parent = nodeMap[node.parent];

    if (!end) {
      if (node.children && node.children.length > 0 && isExpanded(nodeId)) {
        return node.children[0];
      }
    }

    if (parent) {
      const nodeIndex = parent.children.indexOf(nodeId);
      const nextIndex = nodeIndex + 1;

      if (parent.children.length > nextIndex) {
        return parent.children[nextIndex];
      }

      if (node.parent !== -1) {
        return NodeTreeNavigationUtils.getNextNode(
          isExpanded,
          nodeMap,
          node.parent,
          true,
        );
      }
    }

    return null;
  }

  static getPreviousNode(isExpanded: any, nodeMap: any, nodeId: any) {
    const node = nodeMap[nodeId];
    const parent = nodeMap[node.parent];

    if (parent) {
      const nodeIndex = parent.children.indexOf(nodeId);

      if (nodeIndex > 0) {
        return NodeTreeNavigationUtils.getLastNode(
          isExpanded,
          nodeMap,
          parent.children[nodeIndex - 1],
        );
      }

      if (node.parent !== -1) {
        return node.parent;
      }
    }

    return null;
  }

  static getLastNode(
    isExpanded: any,
    nodeMap: any,
    nodeId: number | string = -1,
  ): any {
    const node = nodeMap[nodeId];
    const open = nodeId === -1 || isExpanded(nodeId);
    if (open && node.children && node.children.length > 0) {
      return NodeTreeNavigationUtils.getLastNode(
        isExpanded,
        nodeMap,
        node.children[node.children.length - 1],
      );
    }

    return nodeId;
  }

  static getNodeByFirstCharacter(
    nodeMap: any,
    visibleNodes: any,
    nodeId: any,
    char: any,
  ) {
    const lowercaseChar = char.toLowerCase();

    let toFocus: any = null;
    let useNext = false;
    visibleNodes.forEach((nId: any) => {
      const node = nodeMap[nId];
      const firstChar = node.label.substring(0, 1).toLowerCase();

      if (
        (!toFocus || useNext) &&
        lowercaseChar === firstChar &&
        nId !== nodeId
      ) {
        toFocus = nId;

        useNext = false;
      }

      if (nId === nodeId) {
        useNext = true;
      }
    });

    if (toFocus) {
      return toFocus;
    }

    return null;
  }
}
