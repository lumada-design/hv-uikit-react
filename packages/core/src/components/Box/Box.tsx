import { HvTheme, theme } from "@hitachivantara/uikit-styles";

import { forwardRef } from "react";

import { PolymorphicComponentRef, PolymorphicRef } from "@core/types/generic";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

type SxProps = React.CSSProperties | ((theme: HvTheme) => React.CSSProperties);

type HvBoxBaseProps<C extends React.ElementType> = PolymorphicComponentRef<
  C,
  { style?: React.CSSProperties; sx?: SxProps }
>;

export type HvBoxProps = <C extends React.ElementType = "div">(
  props: HvBoxBaseProps<C>
) => React.ReactElement | null;

const sxFn = (sx: SxProps) => {
  return typeof sx === "function" ? sx(theme) : sx;
};

/**
 * Customizable layout component that can be used to wrap other components.
 * It can be used to add styles to the wrapped components.
 * It can also be used to create a layout using the flexbox properties.
 */
export const HvBox: HvBoxProps = forwardRef(
  <C extends React.ElementType = "div">(
    props: HvBoxBaseProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const {
      style,
      component: Component = "div",
      sx,
      children,
      classes,
      ...restProps
    } = useDefaultProps("HvBox", props);

    return (
      <Component style={sx ? sxFn(sx) : style} ref={ref} {...restProps}>
        {children}
      </Component>
    );
  }
);
