import styled from "@emotion/styled";
import { themeVars, themeUtils } from "theme";

interface DropdownHeaderProps {
  isOpen: boolean;
}

export const DropdownHeader = styled("div")<DropdownHeaderProps>`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 6px ${themeUtils.space(2)} 6px ${themeUtils.space(2)};
  border: 1px solid ${themeVars.colors.acce4};
  background-color: ${themeVars.colors.atmo1};
  & div:last-child {
    margin-left: auto;
    transform: ${(props) => (props.isOpen ? "rotateX(180deg)" : null)};
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${(props) =>
    props.isOpen
      ? `${themeVars.radii.sm} ${themeVars.radii.sm} 0 0`
      : `${themeVars.radii.sm} ${themeVars.radii.sm}`};
`;

if (process.env.NODE_ENV !== "production") {
  DropdownHeader.displayName = "DropdownHeader";
}
