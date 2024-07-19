export class NodeTreeMapUtils {
  static addNodeToNodeMap(
    nodeMap: any,
    nodeId: any,
    childrenIds: any,
    nodeData: any,
  ) {
    const newMap = { ...nodeMap };

    const currentMap = newMap[nodeId];
    newMap[nodeId] = {
      ...currentMap,
      children: childrenIds,
      ...nodeData,
    };
    childrenIds.forEach((childId: any) => {
      const currentChildMap = newMap[childId];
      newMap[childId] = {
        ...currentChildMap,
        parent: nodeId,
      };
    });

    return newMap;
  }

  static removeNodeFromNodeMap(nodeMap: any, nodeId: any) {
    const node = nodeMap[nodeId];
    if (node) {
      const newMap = { ...nodeMap };

      if (node.parent) {
        const parentNode = newMap[node.parent];
        if (parentNode?.children) {
          const parentChildren = parentNode.children.filter(
            (c: any) => c !== nodeId,
          );
          newMap[node.parent] = {
            ...parentNode,
            children: parentChildren,
          };
        }
      }

      delete newMap[nodeId];

      return newMap;
    }

    return nodeMap;
  }
}
