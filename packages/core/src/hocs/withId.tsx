import { useState } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import uniqueId from "lodash/uniqueId";
import { HvExtraProps } from "@core/types";
import { getComponentName } from "@core/utils";

const pascalToKebab = (string = "") =>
  string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

export interface WithIdProps extends HvExtraProps {
  id?: string;
}

const withId = (Component) => {
  const WithId = ({ id, ...others }: WithIdProps) => {
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
