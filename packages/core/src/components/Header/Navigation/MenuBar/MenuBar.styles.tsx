import styled from "@emotion/styled";
import { themeVars } from "@hitachivantara/uikit-styles";

export interface MenuBarRootProps {
  type: string;
  hidden?: boolean;
  active?: boolean;
}

const show = {
  top: `calc(${themeVars.header.height}-2px)`,
  transition: ["top"],
  boxShadow: themeVars.header.shadow,
  transitionDuration: "500ms",
};

export const hide = {
  top: 0,
  transition: ["top"],
  boxShadow: "none",
  transitionDuration: "300ms",
};

export const MenuBarRoot = styled("div")(
  ({ type, hidden, active }: MenuBarRootProps) => ({
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...(type === "menubar" && {
      position: "relative",
      backgroundColor: themeVars.colors.atmo1,
    }),
    ...(hidden && { ...hide }),
    ...(active && { ...show }),
    ...(type === "menu" && {
      position: "absolute",
      zIndex: -2,
      backgroundColor: themeVars.colors.atmo2,
      "& li > div": {
        marginTop: 0,
      },
    }),
  })
);

export const MenuBarUl = styled("ul")({
  margin: 0,
  padding: 0,
  display: "inherit",
  "&:hover .active": {
    ...hide,
  },
  "& li:hover > .hidden": {
    ...show,
  },

  // IE fallback code (using focus-within-polyfill)
  "&.focus-within .active": {
    ...hide,
    zIndex: -2,
  },
  "& li.focus-within > .hidden": {
    ...show,
    zIndex: -1,
  },

  "&:focus-within .active": {
    ...hide,
    zIndex: -2,
  },
  "& li:focus-within> .hidden": {
    ...show,
    zIndex: -1,
  },
  // "& li div.focus-visible + div": {
  //   ...show,
  // },
});
