import styled from "@emotion/styled";
import { themeUtils, themeVars } from "@hitachivantara/uikit-styles";

export const BrandRoot = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const BrandSeparator = styled("div")({
  width: 1,
  height: themeUtils.space(2),
  margin: themeUtils.space(1),
  backgroundColor: themeVars.colors.acce1,
});
