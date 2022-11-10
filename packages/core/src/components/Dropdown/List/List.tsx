import styled from "@emotion/styled";
import { themeVars, themeUtils } from "@hitachivantara/uikit-styles";

export const DropdownList = styled("ul")`
  position: absolute;
  width: 100%;
  padding: ${themeUtils.space(2)};
  border: 1px solid ${themeVars.colors.acce4};
  border-top: none;
  background-color: ${themeVars.colors.atmo1};
  z-index: ${themeVars.zIndices.dropdown};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 0 0 ${themeVars.radii.sm} ${themeVars.radii.sm};
`;

DropdownList.displayName = "DropdownList";
