import { emptyRule, emptyGroup, findNodeById, findParentById } from "./index";

const reducer = (state, action) => {
  const query = { ...state };

  switch (action.type) {
    case "reset-query": {
      return emptyGroup();
    }
    case "reset-group": {
      const group = findNodeById(action.id, query);
      if (group && "rules" in group) {
        group.rules = [emptyRule()];

        return query;
      }
      break;
    }
    case "add-rule": {
      const group = findNodeById(action.id, query);
      if (group && "rules" in group) {
        const rule = emptyRule();

        group.rules.push(rule);

        return query;
      }
      break;
    }
    case "add-group": {
      const group = findNodeById(action.id, query);
      if (group && "rules" in group) {
        group.rules.push(emptyGroup(true));

        return query;
      }
      break;
    }
    case "remove-node": {
      const parent = findParentById(action.id, query);
      if (parent) {
        parent.rules = parent.rules.filter((rule) => rule.id !== action.id);

        return query;
      }

      // reset query if deleting top node
      return emptyGroup();
    }
    case "set-combinator": {
      const node = findNodeById(action.id, query);
      if (node && "combinator" in node) {
        if (node.combinator !== action.combinator) {
          node.combinator = action.combinator;

          return query;
        }
      }
      break;
    }
    case "set-attribute": {
      const node = findNodeById(action.id, query);
      if (node && node.attribute !== action.attribute) {
        node.attribute = action.attribute ?? undefined;

        // we keep the operator and value unless the operator is explicitly null (or set)
        if (action.operator !== undefined) {
          node.operator = action.operator ?? undefined;
          node.value = action.value ?? undefined;
        }

        return query;
      }
      break;
    }
    case "set-operator": {
      const node = findNodeById(action.id, query);
      if (node && "attribute" in node) {
        if (node.operator !== action.operator) {
          node.operator = action.operator;
          if (action.value !== undefined) {
            node.value = action.value ?? undefined;
          }

          return query;
        }
      }
      break;
    }
    case "set-value": {
      const node = findNodeById(action.id, query);
      if (node && "operator" in node) {
        node.value = action.value ?? undefined;

        return query;
      }
      break;
    }

    default:
  }

  // just return existing state if nothing changed
  return state;
};

export default reducer;
