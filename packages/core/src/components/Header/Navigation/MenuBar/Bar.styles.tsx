import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { transientOptions } from "@core/utils/transientOptions";

import headerMenuBarClasses from "./menuBarClasses";

const show = {
  top: `calc(${theme.header.height} - ${theme.header.borderTopThickness})`,
  transition: ["top"],
  boxShadow: theme.header.shadow,
  transitionDuration: "500ms",
  backgroundColor: theme.header.secondLevelBackgroundColor,
};

export const hide = {
  top: 0,
  transition: ["top"],
  boxShadow: "none",
  transitionDuration: "300ms",
};

export const MenuBarRoot = styled(
  "div",
  transientOptions
)(
  ({
    $type,
    $hidden,
    $active,
  }: {
    $type: string;
    $hidden?: boolean;
    $active?: boolean;
  }) => ({
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...($type === "menubar" && {
      position: "relative",
      backgroundColor: theme.header.backgroundColor,
    }),
    ...($type === "menu" && {
      position: "absolute",
      zIndex: -2,
      height: theme.header.secondLevelHeight,
      backgroundColor: theme.header.secondLevelBackgroundColor,
      "& li > div": {
        marginTop: 0,
      },
    }),
    ...($hidden && { ...hide }),
    ...($active && { ...show }),
  })
);

export const MenuBarUl = styled("ul")({
  margin: 0,
  padding: 0,
  display: "inherit",
  alignItems: "center",
  height: "100%",
  [`&:hover .${headerMenuBarClasses.active}`]: {
    ...hide,
  },
  [`& li:hover > .${headerMenuBarClasses.hidden}`]: {
    ...show,
  },

  [`&:focus-within .${headerMenuBarClasses.active}`]: {
    ...hide,
    zIndex: -2,
  },
  [`& li:focus-within > .${headerMenuBarClasses.hidden}`]: {
    ...show,
    zIndex: -1,
  },
});
