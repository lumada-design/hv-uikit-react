import { useDefaultProps } from "@hitachivantara/uikit-react-utils";
import { HvTheme, theme } from "@hitachivantara/uikit-styles";

import {
  fixedForwardRef,
  PolymorphicComponentRef,
  PolymorphicRef,
} from "../types/generic";

// v6 - This shouldn't be named HvBoxProps
export type HvBoxProps<C extends React.ElementType = "div"> =
  PolymorphicComponentRef<
    C,
    {
      style?: React.CSSProperties;
      sx?: React.CSSProperties | ((theme: HvTheme) => React.CSSProperties);
    }
  >;

const sxFn = (sx: HvBoxProps["sx"]) => {
  return typeof sx === "function" ? sx(theme) : sx;
};

/**
 * Customizable layout component that can be used to wrap other components.
 * It can be used to add styles to the wrapped components.
 * It can also be used to create a layout using the flexbox properties.
 */
export const HvBox = fixedForwardRef(function HvBox<
  C extends React.ElementType = "div",
>(props: HvBoxProps<C>, ref?: PolymorphicRef<C>) {
  const {
    style,
    component: Component = "div",
    sx,
    children,
    classes, // Extracted since useDefaultProps creates this prop even if it's not part of the component's API
    ...restProps
  } = useDefaultProps("HvBox", props);

  return (
    <Component style={sx ? sxFn(sx) : style} ref={ref} {...restProps}>
      {children}
    </Component>
  );
});
