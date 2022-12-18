import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

interface DropdownHeaderProps {
  isOpen: boolean;
}

export const DropdownHeader = styled("div")<DropdownHeaderProps>`
  display: flex;
  align-items: center;
  padding: 0 0 0 ${theme.spacing(2)};
  border: 1px solid ${theme.colors.acce4};
  background-color: ${theme.colors.atmo1};
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
      ? `${theme.dropdown.borderRadius} ${theme.dropdown.borderRadius} 0 0`
      : `${theme.dropdown.borderRadius} ${theme.dropdown.borderRadius}`};
`;

if (process.env.NODE_ENV !== "production") {
  DropdownHeader.displayName = "DropdownHeader";
}
