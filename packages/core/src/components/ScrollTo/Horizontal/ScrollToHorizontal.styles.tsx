import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

const name = "HvScrollToHorizontal";

export const { staticClasses, useClasses } = createClasses(name, {
  root: {
    display: "flex",
    padding: "0 30px",
    listStyleType: "none",
    flexWrap: "wrap",
    backdropFilter: `blur(4px)`,
  },
  positionSticky: {
    position: "sticky",
    zIndex: `calc(${theme.zIndices.banner} - 2)`,
    top: 0,
    left: 0,
  },
  positionFixed: {
    position: "fixed",
    zIndex: `calc(${theme.zIndices.banner} - 2)`,
    top: 0,
    left: 0,
  },
  notSelectedRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "16px",
    width: "16px",
    borderRadius: "50%",
  },
  notSelected: {
    height: "4px",
    width: "4px",
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: theme.colors.secondary_60,
  },
  selected: {
    display: "flex",
    height: "16px",
    width: "16px",
  },
});
