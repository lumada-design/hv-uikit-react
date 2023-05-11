export const isBigList = (values) => values != null && values?.length > 10;

export const emptyRule = () => ({
  id: Math.random(),
});

export const emptyGroup = (createEmptyRule = false) => ({
  id: Math.random(),
  combinator: "and",
  rules: createEmptyRule ? [emptyRule()] : [],
});

export const clearNodeIds = (original) => {
  const rule = { ...original };

  delete rule.id;

  if ("rules" in rule) {
    rule.rules = rule.rules.map((r) => clearNodeIds(r));
  }

  return rule;
};

export const findNodeById = (id, node) => {
  if (node.id === id) {
    return node;
  }
  if ("rules" in node) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < node.rules.length; ++i) {
      const rule = node.rules[i];

      const found = findNodeById(id, rule);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

export const findParentById = (id, node, parent?) => {
  if (node.id === id) {
    return parent ?? null;
  }

  if ("rules" in node) {
    const group = node;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < group.rules.length; ++i) {
      const rule = group.rules[i];

      const found = findParentById(id, rule, group);
      if (found) {
        return found;
      }
    }
  }

  return null;
};
