import styled from "@emotion/styled";
import { themeUtils, themeVars } from "theme";

export const HeaderBrandRoot = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const HeaderBrandSeparator = styled("div")({
  width: 1,
  height: themeUtils.space(2),
  margin: themeUtils.space(1),
  backgroundColor: themeVars.colors.acce1,
});
