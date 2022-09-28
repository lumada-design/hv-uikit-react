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

interface Props {
  children: React.ReactNode;
}

const Box = styled("div")<Props>(
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

export default Box;

if (process.env.NODE_ENV !== "production") {
  Box.displayName = "Box";
}
