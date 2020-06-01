import React, { useEffect } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

const withDeprecate = (Component, msg = "") => {
  const WithDeprecate = () => {
    useEffect(() => {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(`${Component.options.name} is deprecated.`, msg);
      }
    }, []);

    return <Component />;
  };

  // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  hoistNonReactStatics(WithDeprecate, Component);

  if (process.env.NODE_ENV !== "production") {
    WithDeprecate.Naked = Component;
  }

  return WithDeprecate;
};

export default withDeprecate;
