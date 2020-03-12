const astTypes = require("ast-types");
const { utils: docgenUtils } = require("react-docgen");

const { getPropertyName, isReactForwardRefCall, printValue, resolveToValue } = docgenUtils;

// based on https://github.com/reactjs/react-docgen/blob/735f39ef784312f4c0e740d4bfb812f0a7acd3d5/src/handlers/defaultPropsHandler.js#L1-L112

const { namedTypes: types } = astTypes;

function getDefaultValue(path) {
  var node = path.node;
  var defaultValue;
  if (types.Literal.check(node)) {
    defaultValue = node.raw;
  } else {
    if (types.AssignmentPattern.check(path.node)) {
      path = resolveToValue(path.get("right"));
    } else {
      path = resolveToValue(path);
    }
    if (types.ImportDeclaration.check(path.node)) {
      defaultValue = node.name;
    } else {
      node = path.node;
      defaultValue = printValue(path);
    }
  }
  if (typeof defaultValue !== "undefined") {
    return {
      value: defaultValue,
      computed:
        types.CallExpression.check(node) ||
        types.MemberExpression.check(node) ||
        types.Identifier.check(node)
    };
  }

  return null;
}

function getDefaultValuesFromProps(properties, documentation) {
  properties
    .filter(propertyPath => types.Property.check(propertyPath.node))
    // Don't evaluate property if component is functional and the node is not an AssignmentPattern
    .filter(propertyPath => types.AssignmentPattern.check(propertyPath.get("value").node))
    .forEach(propertyPath => {
      const propName = getPropertyName(propertyPath);
      if (!propName) return;

      const propDescriptor = documentation.getPropDescriptor(propName);
      const defaultValue = getDefaultValue(propertyPath.get("value", "right"));
      if (defaultValue) {
        propDescriptor.defaultValue = defaultValue;
      }
    });
}

function getRenderBody(componentDefinition) {
  var value = resolveToValue(componentDefinition);
  return value.get("body", "body");
}

function getPropsPath(functionBody) {
  var propsPath;
  // visitVariableDeclarator, can't use visit body.node since it looses scope information
  functionBody
    .filter(path => {
      return types.VariableDeclaration.check(path.node);
    })
    .forEach(path => {
      const declaratorPath = path.get("declarations", 0);
      if (declaratorPath.get("init", "name").value === "props") {
        propsPath = declaratorPath.get("id");
      }
    });

  return propsPath;
}

module.exports = function defaultPropsHandler(documentation, componentDefinition) {
  var renderBody = getRenderBody(componentDefinition);
  var props = getPropsPath(renderBody);
  if (props !== undefined) {
    getDefaultValuesFromProps(props.get("properties"), documentation);
  }
};
