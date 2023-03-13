import styled from "@emotion/styled";
import React, { HTMLAttributes, AllHTMLAttributes } from "react";

export type IconSize = "XS" | "S" | "M" | "L";

type HTMLDivProps = Pick<AllHTMLAttributes<HTMLDivElement>, "name"> &
  Pick<
    HTMLAttributes<HTMLDivElement>,
    Exclude<keyof HTMLAttributes<HTMLDivElement>, "color" | "height" | "width">
  >;

export interface IconBaseProps extends HTMLDivProps {
  /**
   * A String or Array of strings representing the colors to override in the icon.
   * Each element inside the array will override a diferent color.
   * You can use either an HEX or color name from the palette.
   */
  color?: string | string[];
  /**
   * Sets one of the standard sizes of the icons
   */
  iconSize?: IconSize;
  /**
   * A string that will override the viewbox of the svg
   */
  viewbox?: string;
  /**
   * A string that will override the height of the svg
   */
  height?: number;
  /**
   * A string that will override the width of the svg
   */
  width?: number;
  /**
   * Sets one of the standard semantic palette colors of the icon
   */
  semantic?: string;
  /**
   * Inverts the background-foreground on semantic icons
   */
  inverted?: boolean;
  /**
   * * Props passed down to the svg element..
   */
  svgProps?: React.SVGProps<SVGSVGElement>;
}

export const StyledIconBase = styled("div")(
  ({ iconSize }: { iconSize: IconSize }) => ({
    display: "flex",
    "& svg": {
      margin: "auto",
      color: "inherit",
    },
    ...(iconSize === "XS" && {
      width: 32,
      height: 32,
    }),
    ...(iconSize === "S" && {
      width: 32,
      height: 32,
    }),
    ...(iconSize === "M" && {
      width: 48,
      height: 48,
    }),
    ...(iconSize === "L" && {
      width: 112,
      height: 112,
    }),
  })
);

export const IconBase = ({
  children,
  color,
  iconSize = "S",
  ...others
}: IconBaseProps) => {
  return (
    <StyledIconBase iconSize={iconSize} {...others}>
      {children}
    </StyledIconBase>
  );
};
