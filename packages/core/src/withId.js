import React, { useState } from "react";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";
import uniqueId from "lodash/uniqueId";
import getComponentName from "./utils/getComponentName";

const pascalToKebab = (string = "") => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const withId = Component => {
  const WithId = ({ id, ...others }) => {
    const [internalId] = useState(id || uniqueId(`${pascalToKebab(getComponentName(Component))}-`));
    return <Component id={internalId} {...others} />;
  };

  WithId.propTypes = {
    /**
     * Component id.
     */
    id: PropTypes.string
  };

  // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  hoistNonReactStatics(WithId, Component);

  if (process.env.NODE_ENV !== "production") {
    WithId.Naked = Component;
  }

  return WithId;
};

export default withId;
