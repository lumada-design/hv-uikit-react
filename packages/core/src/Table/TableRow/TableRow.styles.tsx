import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const getBorderStyles = (color: string, rowBorderRadius: string) => {
  return {
    "& td": {
      borderTop: `1px solid ${color}`,
      borderBottom: `1px solid ${color}`,
    },
    "& td:first-of-type": {
      borderLeft: `1px solid ${color}`,
      borderRadius: `${rowBorderRadius} 0 0 ${rowBorderRadius}`,
    },
    "& td:last-of-type": {
      borderRight: `1px solid ${color}`,
      borderRadius: `0 ${rowBorderRadius} ${rowBorderRadius} 0`,
    },
  };
};

export const { staticClasses, useClasses } = createClasses("HvTableRow", {
  /** Styles applied to the component root class. */
  root: {
    color: "inherit",
    backgroundColor: theme.colors.atmo1,
    verticalAlign: "middle",
    alignContent: "center",
    outline: 0,
    ":is($hover,$striped):hover": {
      backgroundColor: theme.colors.containerBackgroundHover,
    },
  },
  /** Styles applied to the component root when inside a `HvTableHead`. */
  head: {},
  /** Styles applied to the component root when inside a `HvTableBody`. */
  body: {},
  /** Styles applied to the component root when inside a `HvTableFooter`. */
  footer: {},
  /** Styles applied to the component root when selected. */
  selected: {
    backgroundColor: theme.colors.atmo2,
  },
  /** Styles applied to the component root when expanded. */
  expanded: {
    backgroundColor: theme.colors.atmo1,
    "& > *[role=cell]": {
      borderBottom: "none",
    },
  },
  /** Styles applied to the component root when striped. */
  striped: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.alpha("atmo1", 0.6),
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "transparent",
    },
  },
  /** Styles applied to the component root on hover. */
  hover: {},
  /** Styles applied to the component root when its table variant is list. */
  variantList: {
    // only applied on custom `display`
    marginBottom: theme.space.xs,
    borderRadius: theme.radii.round,

    ...getBorderStyles(theme.colors.atmo4, theme.radii.round),
    backgroundColor: theme.colors.atmo1,
    "&$selected": {
      ...getBorderStyles(theme.colors.secondary, theme.radii.round),

      "&:hover": {
        ...getBorderStyles(theme.colors.atmo4, theme.radii.round),
      },
    },

    "&:hover": {
      ...getBorderStyles(theme.colors.atmo4, theme.radii.round),
    },
    "&.HvIsFocused": {
      borderRadius: theme.radii.round,
    },
  },
  /** Styles applied to the component root when its table variant is list. */
  variantListHead: {
    backgroundColor: "transparent",
  },
});
