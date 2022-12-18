import styled from "@emotion/styled";
import React from "react";

export type IconSize = "XS" | "S" | "M" | "L";

export interface IconBaseProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  color?: string | string[];
  iconSize?: IconSize;
  viewbox?: string;
  height?: number;
  width?: number;
  semantic?: string;
  inverted?: boolean;
  svgProps?: React.SVGProps<SVGSVGElement>;
}

export const StyledIconBase = styled("div")(
  ({ iconSize }: { iconSize: IconSize }) => ({
    display: "flex",
    "& svg": {
      margin: "auto",
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

// export const OldStyledIconBase = styled.div<{ iconSize: IconSize }>(
//   {
//     display: "flex",
//     "& svg": {
//       margin: "auto",
//     },
//   },
//   themeVariant({
//     prop: "iconSize",
//     variants: {
//       XS: {
//         width: 32,
//         height: 32,
//       },
//       S: {
//         width: 32,
//         height: 32,
//       },
//       M: {
//         width: 48,
//         height: 48,
//       },
//       L: {
//         width: 112,
//         height: 112,
//       },
//     },
//   })
// );

export const IconBase = ({ children, iconSize, ...others }) => {
  return (
    <StyledIconBase iconSize={iconSize} {...others}>
      {children}
    </StyledIconBase>
  );
};

if (process.env.NODE_ENV !== "production") {
  IconBase.displayName = "IconBase";
}
