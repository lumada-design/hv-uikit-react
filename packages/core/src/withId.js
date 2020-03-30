import React, { useState } from "react";
import uniqueId from "lodash/uniqueId";

const pascalToKebab = (string = "") => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const withId = Component => props => {
  const [internalId] = useState(props.id || uniqueId(`${pascalToKebab(Component.name)}-`));
  return <Component id={internalId} {...props} />;
};

export default withId;
