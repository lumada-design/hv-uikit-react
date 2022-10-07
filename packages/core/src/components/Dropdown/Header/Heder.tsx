import styled from "@emotion/styled";
import { themeVars, themeUtils } from "theme";

interface DropdownHeaderProps {
  isOpen: boolean;
}

export const DropdownHeader = styled("div")<DropdownHeaderProps>`
  display: flex;
  align-items: center;
  padding: 0 0 0 ${themeUtils.space(2)};
  border: 1px solid ${themeVars.colors.acce4};
  background-color: ${themeVars.colors.atmo1};
  & div:last-child {
    margin-left: auto;
    transform: rotateX(180deg);
    transform: ${(props) => (props.isOpen ? "rotateX(0deg)" : "null")};
  }
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${(props) =>
    props.isOpen
      ? `${themeVars.dropdown.borderRadius} ${themeVars.dropdown.borderRadius} 0 0`
      : `${themeVars.dropdown.borderRadius} ${themeVars.dropdown.borderRadius}`};
`;

if (process.env.NODE_ENV !== "production") {
  DropdownHeader.displayName = "DropdownHeader";
}
