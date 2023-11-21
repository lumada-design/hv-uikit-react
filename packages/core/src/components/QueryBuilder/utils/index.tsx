import { HvQueryBuilderQueryGroup, HvQueryBuilderQueryRule } from "../types";

export const isBigList = (values: unknown[]) =>
  values != null && values?.length > 10;

export const emptyRule = () => ({
  id: Math.random(),
});

export const emptyGroup = (createEmptyRule = false) => ({
  id: Math.random(),
  combinator: "and",
  rules: createEmptyRule ? [emptyRule()] : [],
});

export const clearNodeIds = (
  original: HvQueryBuilderQueryGroup | HvQueryBuilderQueryRule
) => {
  const rule = { ...original };

  // @ts-ignore
  delete rule.id;

  if ("rules" in rule) {
    rule.rules = rule.rules.map((r) => clearNodeIds(r));
  }

  return rule;
};

export const findNodeById = (
  id: React.Key,
  node: HvQueryBuilderQueryGroup | HvQueryBuilderQueryRule
) => {
  if (node.id === id) {
    return node;
  }
  if ("rules" in node) {
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

export const findParentById = (
  id: React.Key,
  node: HvQueryBuilderQueryGroup | HvQueryBuilderQueryRule,
  parent?: HvQueryBuilderQueryGroup
) => {
  if (node.id === id) {
    return parent ?? null;
  }

  if ("rules" in node) {
    const group = node;

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
