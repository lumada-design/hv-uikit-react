export default class NodeTreeMapUtils {
  static addNodeToNodeMap(nodeMap, nodeId, childrenIds, nodeData) {
    const newMap = { ...nodeMap };

    const currentMap = newMap[nodeId];
    newMap[nodeId] = {
      ...currentMap,
      children: childrenIds,
      ...nodeData,
    };
    childrenIds.forEach((childId) => {
      const currentChildMap = newMap[childId];
      newMap[childId] = {
        ...currentChildMap,
        parent: nodeId,
      };
    });

    return newMap;
  }

  static removeNodeFromNodeMap(nodeMap, nodeId) {
    const node = nodeMap[nodeId];
    if (node) {
      const newMap = { ...nodeMap };

      if (node.parent) {
        const parentNode = newMap[node.parent];
        if (parentNode && parentNode.children) {
          const parentChildren = parentNode.children.filter(
            (c) => c !== nodeId
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
