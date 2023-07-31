import styled from "@emotion/styled";

import {
  DropLeftXS as DropLeftIcon,
  DropRightXS as DropRightIcon,
} from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";

import navigationClasses from "./navigationClasses";

export const StyledRoot = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const StyledDropLeftIcon = styled(DropLeftIcon)({
  userSelect: "none",
  width: "32px",
  height: "32px",
  "&:hover": {
    backgroundColor: theme.colors.atmo3,
    cursor: "pointer",
  },
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    backgroundColor: theme.colors.atmo3,
    cursor: "pointer",
    ...outlineStyles,
  },
});

export const StyledDropRightIcon = styled(DropRightIcon)({
  userSelect: "none",
  width: "32px",
  height: "32px",
  "&:hover": {
    backgroundColor: theme.colors.atmo3,
    cursor: "pointer",
  },
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    backgroundColor: theme.colors.atmo3,
    cursor: "pointer",
    ...outlineStyles,
  },
});

export const StyledText = styled("div")({
  [`&.${navigationClasses.text}`]: {
    width: "calc(100% - 64px)",
    textAlign: "center",
    height: "32px",
    padding: "8px 0",
    "&:hover": {
      backgroundColor: theme.colors.atmo3,
      cursor: "pointer",
    },
    "&:focus": {
      outline: "none",
    },
    "&:focus-visible": {
      backgroundColor: theme.colors.atmo3,
      cursor: "pointer",
      ...outlineStyles,
    },
  },
  [`&.${navigationClasses.textWithoutHover}`]: {
    width: "calc(100% - 64px)",
    textAlign: "center",
    padding: "0 5px",
    outline: "none",
  },
});
