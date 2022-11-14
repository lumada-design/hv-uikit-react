import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export const DropdownList = styled("ul")`
  position: absolute;
  width: 100%;
  padding: ${theme.spacing(2)};
  border: 1px solid ${theme.colors.acce4};
  border-top: none;
  background-color: ${theme.colors.atmo1};
  z-index: ${theme.zIndices.dropdown};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 0 0 ${theme.radii.sm} ${theme.radii.sm};
`;

DropdownList.displayName = "DropdownList";
