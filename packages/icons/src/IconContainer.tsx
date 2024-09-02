import { forwardRef, ReactNode } from "react";
import styled from "@emotion/styled";
import { getColor, HvColorAny, HvSize } from "@hitachivantara/uikit-styles";

import { IconSize } from "./IconBase";
import { getSizeStyles } from "./utils";

export const StyledIconBase = styled("div")({
  display: "flex",
  fontSize: 16,
  // box has a minimum size of 32px (`xs` & `sm`)
  width: "var(--size, 32px)",
  height: "var(--size, 32px)",
  transition: "rotate 0.2s ease",
  justifyContent: "center",
  alignItems: "center",
});

export interface HvIconContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /**
   * A color to override the default icon colors.
   * Accepts any valid CSS color or color from the UI Kit palette.
   * @example "brand"
   */
  color?: HvColorAny;
  /**
   * The size of the icon container. Takes in a `number` in pixels or any `HvSize` or `IconSize`.
   *
   * This will also affect the size of the icon by changing the `font-size`.
   *
   * @example
   * size={16} // 32px container 16px svg
   * size="S" // 32px container 16px svg
   * size="sm" // 32px container 16px svg
   * size="md" // 48px container 32px svg
   *
   * @default "S"
   */
  size?: HvSize | IconSize | number;
  /**
   * Icon to render.
   */
  children?: ReactNode;
}

/**
 * A component used to contain icons in the established margins.
 * This allows for the use of external icons with our components that expect an icon container of a specific size.
 * It also makes the use of our colors easier through the `color` prop.
 *
 * @example
 * <HvIconContainer color="warning" size="lg" />
 *  <svg />
 * </HvIconContainer>
 *
 */
export const HvIconContainer = forwardRef<HTMLDivElement, HvIconContainerProps>(
  (props, ref) => {
    const { size, style: styleProp, color, children, ...others } = props;
    return (
      <StyledIconBase
        ref={ref}
        style={{
          ...getSizeStyles("", size),
          color: getColor(color),
          ...styleProp,
        }}
        {...others}
      >
        {children}
      </StyledIconBase>
    );
  },
);
