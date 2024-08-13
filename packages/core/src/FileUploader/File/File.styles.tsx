import { createClasses } from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

export const { staticClasses, useClasses } = createClasses("HvFile", {
  root: {},
  progressbar: {
    position: "absolute",
    top: "-1px",
  },
  progressbarContainer: {
    height: "4px",
  },
  progressbarBack: {},
  nameText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  progressTextContainer: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
  },
  removeButton: {
    width: 32,
    height: 32,
    margin: `0px ${theme.space.xs}`,
  },
  previewContainer: {
    display: "flex",
    margin: `0px ${theme.space.xs}`,
    width: "48px",
    height: "48px",
    justifyContent: "center",
    alignItems: "center",

    "& span": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },

    "& img": {
      width: "40px",
      height: "40px",
      objectFit: "cover",
      objectPosition: "center",
      alignSelf: "center",
    },
  },
  icon: {
    width: 32,
    height: 32,
    margin: `0px ${theme.space.xs}`,
  },
  fail: {},
});
