import { theme } from "@hitachivantara/uikit-styles";

import { outlineStyles } from "@core/utils/focusUtils";

import { createClasses } from "@core/utils/classes";

const selected = () => ({
  background: theme.colors.atmo3,
  borderLeft: theme.verticalNavigation.activeBorderLeft,
  "& *": {
    background: theme.colors.atmo3,
  },
});

const hover = () => ({
  background: theme.colors.containerBackgroundHover,
});

export const { staticClasses, useClasses } = createClasses(
  "HvVerticalNavigationTreeViewItem",
  {
    node: {
      listStyle: "none",
      minHeight: "32px",
      "&:not(:last-child)": {
        marginBottom: "8px",
      },
      "&$collapsed": {
        "&>$group": {
          display: "none",
        },
      },
      "&$expanded": {
        "&>$group": {
          display: "block",
        },
      },
      "&$link": {
        textDecoration: "none",
      },
      "&$hide": {
        display: "none",
      },
    },
    content: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "32px",
      borderLeft: theme.verticalNavigation.inactiveBorderLeft,
      paddingRight: theme.space.xs,
      "&$minimized": {
        justifyContent: "center",
        paddingRight: 0,
      },
      "$expandable>&": {
        fontWeight: 600,
      },
      "$selected>&": selected(),
      // hover
      ":not($disabled>&):not($selected>&):hover": hover(),
      ":not($disabled)$selected>&:hover": {},

      // focus
      ":not($disabled>&):not($selected>&):focus-visible": hover(),
      ":not($disabled>&):not($selected>&).focus-visible": hover(),

      "*:focus-visible $focused>&": {
        ...outlineStyles,
      },

      ".focus-visible $focused>&": {
        ...outlineStyles,
      },
      "$focused>&": {
        ...hover(),
      },

      "&[disabled], &:active": {
        outline: "none",
      },

      "&:focus": {
        outline: "none",
      },

      "&:focus-visible": {
        ...outlineStyles,
      },

      "&.focus-visible": {
        ...outlineStyles,
      },

      // cursor
      cursor: "pointer",
      "& *": {
        cursor: "pointer",
      },

      "$disabled>&": {
        cursor: "not-allowed",
        "& *": {
          cursor: "not-allowed",
        },
      },
    },
    link: {},
    group: {
      margin: "8px 0 0 0",
      padding: 0,
    },
    disabled: {},
    expandable: {
      fontWeight: 600,
    },
    collapsed: {},
    expanded: {},
    selectable: {},
    unselectable: {},
    selected: {},
    unselected: {},
    focused: {},
    minimized: {},
    hide: {},
    label: {
      display: "flex",
      flexGrow: 1,
      maxWidth: "100%",
    },
    labelIcon: {
      maxWidth: "calc(100% - 32px)",
    },
    labelExpandable: {
      maxWidth: "calc(100% - 32px)",

      "&$labelIcon": {
        maxWidth: "calc(100% - 64px)",
      },
    },
  }
);
