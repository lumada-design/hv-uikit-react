import styled from "@emotion/styled";
import { themeVariant } from "@hitachivantara/uikit-styles";

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

export const StyledIconBase = styled.div<{ iconSize: IconSize }>(
  {
    display: "flex",
    "& svg": {
      margin: "auto",
    },
  },
  themeVariant({
    prop: "iconSize",
    variants: {
      xs: {
        width: 32,
        height: 32,
      },
      s: {
        width: 32,
        height: 32,
      },
      m: {
        width: 48,
        height: 48,
      },
      l: {
        width: 112,
        height: 112,
      },
    },
  })
);

export const IconBase = ({ children, iconSize }) => {
  return <StyledIconBase iconSize={iconSize}>{children}</StyledIconBase>;
};

IconBase.displayName = "IconBase";
