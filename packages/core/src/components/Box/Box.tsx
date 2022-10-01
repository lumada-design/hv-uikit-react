import styled from "@emotion/styled";
import {
  border,
  color,
  display,
  flexbox,
  grid,
  layout,
  margin,
  overflow,
  padding,
  position,
  shadow,
  space,
  zIndex,
} from "styled-system";
import { themeVars } from "theme";

export interface BoxProps {
  children: React.ReactNode;
}

export const Box = styled("div")<BoxProps>(
  border,
  color,
  display,
  flexbox,
  grid,
  layout,
  margin,
  overflow,
  padding,
  position,
  shadow,
  space,
  zIndex,
  {
    fontFamily: themeVars.fontFamily.body,
    color: themeVars.colors.acce1,
  }
);

if (process.env.NODE_ENV !== "production") {
  Box.displayName = "Box";
}
