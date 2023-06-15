import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";
import { HvFilterGroupContentClasses } from "./filterContentClasses";

export const styles: Partial<
  Record<keyof HvFilterGroupContentClasses, CSSInterpolation>
> = {
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
    padding: theme.spacing(["0px", "30px", "0px", "0px"]),
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
    boxShadow: theme.filterGroup.rightPanelShadow,
    borderLeft: theme.filterGroup.rightPanelBorderLeft,
  },
  leftSidePanel: {
    display: "inline-block",
    width: `calc(50% - ${theme.spacing("sm")} - ${theme.spacing("sm")} + 8px)`,
    height: `calc(100% - ${theme.spacing("sm")} - ${theme.spacing(
      "sm"
    )} + 8px)`,
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
    marginRight: theme.filterGroup.applyButtonMarginRight,
  },
};
