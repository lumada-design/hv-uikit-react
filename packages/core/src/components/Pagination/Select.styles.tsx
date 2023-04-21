import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { baseDropdownClasses } from "@core/components";

export const StyledRoot = styled("div")({
  [`& .${baseDropdownClasses.root}`]: {
    width: "auto",

    [`& > div.${baseDropdownClasses.anchor}`]: {
      width: "auto",
    },
    [`& .${baseDropdownClasses.header}`]: {
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
    [`& .${baseDropdownClasses.headerOpen}`]: {
      backgroundColor: theme.colors.atmo1,
      borderColor: theme.colors.atmo1,
    },
    [`& .${baseDropdownClasses.selection}`]: {
      borderRadius: theme.pagination.pageSizeBorderRadius,
      border: `1px solid ${theme.pagination.pageSizeBorderColor}`,
    },
  },
});
