import { CSSProperties } from "react";
import { theme } from "@hitachivantara/uikit-styles";
import { inputClasses } from "@core/components";
import { createClasses } from "@core/utils";

const hoverColor = theme.colors.atmo3;

export const { staticClasses, useClasses } = createClasses("HvPagination", {
  /** Styles applied to the component root class. */
  root: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    marginTop: theme.space.sm,
    [`& $pageSizeInput`]: {
      ...(theme.typography.label as CSSProperties),
    },
    [`& $pageSizeInputContainer`]: {
      width: 40,
      minWidth: 40,
      maxWidth: theme.spacing(8),
    },
    [`&& $pageSizeInputRoot`]: {
      backgroundColor: "transparent",
      "&:focus, &:focus-within, &:hover": {
        backgroundColor: hoverColor,
      },
    },
  },
  /** Styles applied to the page size selector container. */
  pageSizeOptions: {
    display: "flex",
    position: "absolute",
    height: 32,
    marginRight: 40,
    top: "50%",
    transform: "translateY(-50%)",
    left: "0",
  },
  /** Styles applied to the element that holds the labels for the page size selector */
  pageSizeTextContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "32px",
    padding: "8px 0",
  },
  /** Styles applied to the page size selector dropdown element. */
  pageSizeOptionsSelect: {
    display: "inline-block",
    margin: `0px ${theme.space.xs}`,
    width: "auto",
  },
  /** Styles applied to the page navigation container. */
  pageNavigator: {
    display: "flex",
    alignItems: "stretch",
    height: "32px",
    "&>*": {
      margin: `0 4px`,
    },
  },
  /** Styles applied to each navigation `HvButton` icon container. */
  iconContainer: {
    padding: 0,
  },
  /** Styles applied to each navigation icon. */
  icon: {},
  /** Styles applied to the central page information container. */
  pageInfo: {
    display: "inline-block",
    whiteSpace: "nowrap",
    height: "32px",
    lineHeight: "32px",
  },
  /** Styles applied to the page selector input container. */
  pageJump: {
    display: "inline-block",
    marginRight: `4px`,
    [`& .${inputClasses.inputRoot}`]: {
      [`& $pageSizeInput`]: {
        paddingLeft: `4px`,
        paddingRight: `4px`,
        margin: 0,
        textAlign: "center",
        borderRadius: theme.radii.base,
        MozAppearance: "textfield",
        "&:focus": {
          backgroundColor: hoverColor,
        },
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  },
  /** Styles passed down to the page selector Input component as `input`. */
  pageSizeInput: {},
  /** Styles passed down to the page selector Input root. */
  pageSizeInputRoot: {},
  /** Styles passed down to the page selector Input component as `container`. */
  pageSizeInputContainer: {},
});
