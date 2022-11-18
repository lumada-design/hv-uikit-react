import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";

export interface MenuBarRootProps {
  type: string;
  hidden?: boolean;
  active?: boolean;
}

const show = {
  top: `calc(${theme.header.height} - ${theme.header.borderTopThickness})`,
  transition: ["top"],
  boxShadow: theme.header.shadow,
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
      backgroundColor: theme.colors.atmo1,
    }),
    ...(type === "menu" && {
      position: "absolute",
      paddingTop: theme.header.selectedItemBorderBottomThickness,
      zIndex: -2,
      backgroundColor: theme.colors.atmo2,
      "& li > div": {
        marginTop: 0,
      },
    }),
    ...(hidden && { ...hide }),
    ...(active && { ...show }),
  })
);

export const MenuBarUl = styled("ul")({
  margin: 0,
  padding: 0,
  display: "inherit",
  alignItems: "center",
  height: "100%",
  "&:hover .active": {
    ...hide,
  },
  "& li:hover > .hidden": {
    ...show,
  },

  "&:focus-within .active": {
    ...hide,
    zIndex: -2,
  },
  "& li:focus-within > .hidden": {
    ...show,
    zIndex: -1,
  },
});
