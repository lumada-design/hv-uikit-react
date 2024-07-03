import { createClasses } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvDragSplitView", {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    position: "relative",
  },
  first: {
    overflow: "auto",
    minHeight: 200,
  },
  last: {
    overflow: "auto",
    minHeight: 200,
  },
  separatorContainer: {
    padding: "6px 0",
    cursor: "row-resize",
  },
  separator: {
    height: 2,
    background: "gray",
  },
  preventSelection: {
    userSelect: "none",
  },
});
