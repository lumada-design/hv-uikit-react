import styled from "@emotion/styled";
import { HvBox } from "components";
import { themeUtils, themeVars } from "theme";

export const Box = styled(HvBox)({
  backgroundColor: themeVars.colors.sema7,
  color: themeVars.colors.base2,
  fontSize: themeVars.fontSizes.sm,
  border: 0,
  borderRadius: themeVars.tag.borderRadius,
  padding: `${themeUtils.space(0.5)} ${themeUtils.space(2)}`,
});
