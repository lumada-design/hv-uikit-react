import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { themeUtils, themeVariant, themeVars } from "theme";

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

// 2.1 - Variants

export const MenuBarRoot = styled.div<{
  type: string;
  hidden?: boolean;
  active?: boolean;
}>(
  {
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  themeVariant({
    prop: "type",
    variants: {
      menubar: {
        position: "relative",
        backgroundColor: themeVars.colors.atmo1,
      },
      menu: {
        position: "absolute",
        zIndex: -2,
        backgroundColor: themeVars.colors.atmo2,
        "& li > div": {
          marginTop: 0,
        },
      },
    },
  }),
  themeVariant({
    prop: "hidden",
    variants: {
      true: {
        ...hide,
      },
      false: {},
    },
  }),
  themeVariant({
    prop: "active",
    variants: {
      true: {
        ...show,
      },
      false: {},
    },
  })
);

// 2.2 - Props with css

const styles = ({ type, hidden, active }) => css`
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${type === "menubar"
    ? `
      position: relative;
      background-color: ${themeVars.colors.atmo1};
    `
    : type === "menu"
    ? `
        position: absolute;
        z-index: -2;
        background-color: ${themeVars.colors.atmo2};
      `
    : ``}
  ${hidden === true &&
  `
      top: 0;
      transition: top;
      box-shadow: none;
      transition-duration: 300ms;
    `}
  ${active === true &&
  `
    top: ${themeUtils.space(5)};
    transition: top;
    box-shadow: ${themeVars.header.shadow};
    transition-duration: 500ms;
    `}
`;

// 2.3 - Props with JSS syntax

interface MenuBarRootTwoParams {
  type: string;
  hidden?: boolean;
  active?: boolean;
}

export const MenuBarRootTwo = styled("div")(
  ({ type, hidden, active }: MenuBarRootTwoParams) => ({
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
    ...(type === "menu" && {
      position: "absolute",
      zIndex: -2,
      backgroundColor: themeVars.colors.atmo2,
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
  "&:hover .active": {
    ...hide,
  },
  "& li:hover > .hidden": {
    ...show,
  },
});

export default styles;
