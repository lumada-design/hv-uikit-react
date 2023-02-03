import { useState } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import uniqueId from "lodash/uniqueId";
import { HvExtraProps } from "types";
import { getComponentName } from "utils";

const pascalToKebab = (string = "") =>
  string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const withId = (Component) => {
  const WithId = ({ id, ...others }: { id?: string } & HvExtraProps) => {
    const [internalId] = useState(
      id || uniqueId(`${pascalToKebab(getComponentName(Component))}-`)
    );

    return <Component id={internalId} {...others} />;
  };

  // https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  hoistNonReactStatics(WithId, Component);

  if (process.env.NODE_ENV !== "production") {
    WithId.Naked = Component;
  }

  return WithId;
};

export default withId;
