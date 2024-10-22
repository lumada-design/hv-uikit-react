import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { baseDropdownClasses } from "../BaseDropdown";

export const { staticClasses, useClasses } = createClasses("HvPagination", {
  /** Styles applied to the component root class. */
  root: {
    ...theme.typography.caption2,
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    marginTop: theme.space.sm,
  },
  /** Styles applied to the page size selector container. */
  pageSizeOptions: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    gap: theme.space.xs,
    height: 24,
    top: "50%",
    transform: "translateY(-50%)",
    left: 0,
  },
  pageSizeHeader: {
    height: 24,
    display: "flex",
    alignItems: "center",
    [`& .${baseDropdownClasses.arrowContainer}`]: {
      marginTop: -2,
    },
  },
  pageSizeRoot: {
    width: "auto",
  },
  /** Styles applied to the element that holds the labels for the page size selector */
  pageSizeTextContainer: {},
  totalPagesTextContainer: {},
  /** Styles applied to the page size selector dropdown element. */
  pageSizeOptionsSelect: {
    display: "inline-block",
    width: "auto",
  },
  /** Styles applied to the page navigation container. */
  pageNavigator: {
    display: "flex",
    alignItems: "center",
    height: "32px",
    gap: 0,
  },
  /** Styles applied to each navigation `HvButton` icon container. */
  iconContainer: {},
  /** Styles applied to each navigation icon. */
  icon: {},
  /** Styles applied to the central page information container. */
  pageInfo: {
    display: "inline-flex",
    gap: 4,
    whiteSpace: "nowrap",
    height: "32px",
    lineHeight: "32px",
    margin: theme.spacing(0, "xs"),
    alignItems: "center",
  },
  /** Styles applied to the page selector input container. */
  pageJump: {
    display: "inline-block",
  },
  /** Styles passed down to the page selector Input component as `input`. */
  pageSizeInput: {
    ...theme.typography.caption2,
    paddingLeft: `4px`,
    paddingRight: `4px`,
    margin: 0,
    textAlign: "center",
    borderRadius: theme.radii.base,
    MozAppearance: "textfield",
    "&:focus": {
      padding: 0,
      backgroundColor: theme.colors.bgHover,
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  /** Styles passed down to the page selector Input root. */
  pageSizeInputRoot: {
    backgroundColor: "transparent",
    height: "24px",
    "&:focus, &:focus-within, &:hover": {
      backgroundColor: theme.colors.bgHover,
    },
  },
  /** Styles passed down to the page selector Input component as `container`. */
  pageSizeInputContainer: {
    width: 24,
    minWidth: 24,
    maxWidth: theme.spacing(8),
  },
});
