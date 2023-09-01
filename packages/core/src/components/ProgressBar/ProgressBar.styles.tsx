import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { useClasses, staticClasses } = createClasses("HvProgressBar", {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    // progress
    width: "100%",
  },
  progress: {
    width: "100%",
  },
  progressBar: {
    backgroundColor: "#000",
  },
  progressBarLabel: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "end",
  },
  progressContainer: {
    width: "100%",
  },
  progressDone: {
    backgroundColor: theme.colors.positive,
  },
  progressBarContainer: {
    display: "flex",
    width: "100%",
    height: 4,
    backgroundColor: theme.colors.atmo4,
  },
  progressError: {
    backgroundColor: theme.colors.negative,
  },
});
