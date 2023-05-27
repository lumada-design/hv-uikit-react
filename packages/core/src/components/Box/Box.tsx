import { theme } from "@hitachivantara/uikit-styles";
import { forwardRef } from "react";
import { PolymorphicComponentRef, PolymorphicRef } from "@core/types";

type SxProps = React.CSSProperties | ((theme) => React.CSSProperties);

type HvBaseProps<C extends React.ElementType> = PolymorphicComponentRef<
  C,
  { style?: React.CSSProperties; sx?: SxProps }
>;

export type HvBoxProps = <C extends React.ElementType = "div">(
  props: HvBaseProps<C>
) => React.ReactElement | null;

const useSx = (sx: SxProps) => {
  return typeof sx === "function" ? sx(theme) : sx;
};

export const HvBox: HvBoxProps = forwardRef(
  <C extends React.ElementType = "div">(
    { style, component, sx, children, ...restProps }: HvBaseProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = component || "div";

    return (
      <Component style={sx ? useSx(sx) : style} ref={ref} {...restProps}>
        {children}
      </Component>
    );
  }
);
