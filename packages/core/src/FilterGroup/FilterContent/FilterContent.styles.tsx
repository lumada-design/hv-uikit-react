import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

const name = "HvFilterGroupContent";

export const { staticClasses, useClasses } = createClasses(name, {
  dropdown: {},
  panel: {
    maxHeight: 500,
    minHeight: 370,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    height: 32,
  },
  baseDropdownSelection: {
    padding: theme.spacing("0px", "30px", "0px", "0px"),
  },
  root: {
    width: 640,
    maxHeight: "calc(500px - 75px)",
    minHeight: "calc(370px - 75px)",
  },
  rightSidePanel: {
    display: "inline-block",
    width: "50%",
    height: "100%",
    maxHeight: "calc(500px - 75px)",
    minHeight: "calc(370px - 75px)",
    verticalAlign: "top",
    overflow: "visible",
    boxShadow: "none",
    borderLeft: `1px solid ${theme.colors.atmo3}`,
  },
  leftSidePanel: {
    display: "inline-block",
    width: `calc(50% - ${theme.space.sm} - ${theme.space.sm} + 8px)`,
    height: `calc(100% - ${theme.space.sm} - ${theme.space.sm} + 8px)`,
    verticalAlign: "top",
    maxHeight: "calc(500px - 75px)",
    minHeight: "calc(370px - 75px)",
    padding: 4,
    margin: `calc(${theme.spacing("sm")} - 4px)`,
  },
  actionBar: {},
  space: {
    flex: 1,
  },
  applyButton: {
    marginRight: "8px",
  },
});
