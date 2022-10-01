import styled from "@emotion/styled";
import { themeVars, themeUtils } from "theme";

export interface DropdownListItemProps {
  isSelected: boolean;
}

export const DropdownListItem = styled("li")<DropdownListItemProps>`
  padding: 6px 40px 6px ${themeUtils.space(2)};
  list-style: none;
  &:hover {
    background-color: ${themeVars.colors.acce2s};
  }
  background-color: ${(props) =>
    props.isSelected ? themeVars.colors.acce2s : null};
`;

if (process.env.NODE_ENV !== "production") {
  DropdownListItem.displayName = "DropdownListItem";
}
