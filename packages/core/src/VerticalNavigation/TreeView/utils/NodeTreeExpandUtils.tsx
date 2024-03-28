export class NodeTreeExpandUtils {
  static isExpanded(expanded, nodeId) {
    return Array.isArray(expanded) ? expanded.indexOf(nodeId) !== -1 : false;
  }

  static toggle(expanded, nodeId) {
    let newExpanded;
    if (expanded.indexOf(nodeId) !== -1) {
      newExpanded = expanded.filter(
        (expandedNodeId) => expandedNodeId !== nodeId,
      );
    } else {
      newExpanded = [...expanded, nodeId];
    }

    return newExpanded;
  }

  static expandAllSiblings(expanded, nodeMap, nodeId) {
    const node = nodeMap[nodeId];
    const parent = nodeMap[node.parent];

    const diff = parent.children
      .filter((childNode) => nodeMap[childNode].children != null)
      .filter(
        (childNode) => !NodeTreeExpandUtils.isExpanded(expanded, childNode),
      );

    if (diff.length > 0) {
      return [...expanded, ...diff];
    }

    return expanded;
  }

  static getVisibleNodes(expanded, nodeMap, nodeId = -1) {
    const toReturn: number[] = [];
    if (nodeId !== -1) {
      toReturn.push(nodeId);
    }

    const visibleChildren =
      nodeId === -1 ||
      expanded === true ||
      NodeTreeExpandUtils.isExpanded(expanded, nodeId);

    if (visibleChildren) {
      const node = nodeMap[nodeId];

      if (node && node.children) {
        node.children.forEach((childId) =>
          toReturn.push(
            ...NodeTreeExpandUtils.getVisibleNodes(expanded, nodeMap, childId),
          ),
        );
      }
    }

    return toReturn;
  }
}
