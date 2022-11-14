import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export interface DropdownListItemProps {
  isSelected: boolean;
}

export const DropdownListItem = styled("li")<DropdownListItemProps>`
  padding: 6px 40px 6px ${theme.spacing(2)};
  list-style: none;
  &:hover {
    background-color: ${theme.colors.acce2s};
  }
  background-color: ${(props) =>
    props.isSelected ? theme.colors.acce2s : null};
`;

DropdownListItem.displayName = "DropdownListItem";
