import { theme } from "@hitachivantara/uikit-styles";
import { forwardRef } from "react";
import { PolymorphicComponentRef, PolymorphicRef } from "types/base";

type SxProps = React.CSSProperties | ((theme: Theme) => React.CSSProperties);

type BaseProps<C extends React.ElementType> = PolymorphicComponentRef<
  C,
  { style?: React.CSSProperties; sx?: SxProps }
>;

export type BoxProps = <C extends React.ElementType = "div">(
  props: BaseProps<C>
) => React.ReactElement | null;

const useSx = (sx: SxProps) => {
  return typeof sx === "function" ? sx(theme) : sx;
};

export const Box: BoxProps = forwardRef(
  <C extends React.ElementType = "div">(
    { style, as, sx, children, ...restProps }: BaseProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Component = as || "div";

    return (
      <Component style={sx ? useSx(sx) : style} ref={ref} {...restProps}>
        {children}
      </Component>
    );
  }
);
