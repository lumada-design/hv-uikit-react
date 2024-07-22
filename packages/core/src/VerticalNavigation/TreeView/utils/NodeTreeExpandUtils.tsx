export class NodeTreeExpandUtils {
  static isExpanded(expanded: any, nodeId: any) {
    return Array.isArray(expanded) ? expanded.indexOf(nodeId) !== -1 : false;
  }

  static toggle(expanded: any, nodeId: any) {
    let newExpanded;
    if (expanded.indexOf(nodeId) !== -1) {
      newExpanded = expanded.filter(
        (expandedNodeId: any) => expandedNodeId !== nodeId,
      );
    } else {
      newExpanded = [...expanded, nodeId];
    }

    return newExpanded;
  }

  static expandAllSiblings(expanded: any, nodeMap: any, nodeId: any) {
    const node = nodeMap[nodeId];
    const parent = nodeMap[node.parent];

    const diff = parent.children
      .filter((childNode: any) => nodeMap[childNode].children != null)
      .filter(
        (childNode: any) =>
          !NodeTreeExpandUtils.isExpanded(expanded, childNode),
      );

    if (diff.length > 0) {
      return [...expanded, ...diff];
    }

    return expanded;
  }

  static getVisibleNodes(expanded: any, nodeMap: any, nodeId = -1) {
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

      if (node?.children) {
        node.children.forEach((childId: any) =>
          toReturn.push(
            ...NodeTreeExpandUtils.getVisibleNodes(expanded, nodeMap, childId),
          ),
        );
      }
    }

    return toReturn;
  }
}
