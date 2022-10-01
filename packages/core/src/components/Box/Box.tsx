import React from "react";
import { themeVars } from "theme";

export interface BoxProps<C extends React.ElementType> {
  as?: C;
  children: React.ReactNode;
  style?: React.CSSProperties;
  sx?: Sx;
}

type Sx = React.CSSProperties | ((themeVars) => React.CSSProperties);

type UIkitTheme = {
  primarycolor: string;
  padding: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const extractSx = (sx: Sx, theme: UIkitTheme) => {
  return typeof sx === "function" ? sx(themeVars) : sx;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useSx = (sx: Sx, systemStyles: UIkitTheme, className: string) => {
  return extractSx(sx, systemStyles);
}; //transformar em css

export const Box: React.FC<BoxProps<any>> = <C extends React.ElementType>({
  as,
  children,
  style,
  sx,
}: BoxProps<C>) => {
  const Component = as || "div";

  const systemStyles = {
    primarycolor: "blue",
    padding: "20px",
  };

  const className = "teste";

  return (
    <Component style={sx ? useSx(sx, systemStyles, className) : style}>
      {children}
    </Component>
  );
};

if (process.env.NODE_ENV !== "production") {
  Box.displayName = "Box";
}
