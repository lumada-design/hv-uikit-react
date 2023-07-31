import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import { HvTypography } from "@core/components/Typography";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledRoot = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  // progress
  width: "100%",
});

export const StyledProgressContainer = styled("div")({
  width: "100%",
});

export const StyledValue = styled(HvTypography)({
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "end",
});

export const StyledProgressBarContainer = styled("div")({
  display: "flex",
  width: "100%",
  height: 4,
  backgroundColor: theme.colors.atmo4,
});

export const StyledProgressBar = styled(
  "div",
  transientOptions
)(({ $status }: { $status?: "inProgress" | "completed" | "error" }) => ({
  backgroundColor: "#000",
  height: 4,
  ...($status === "completed" && {
    backgroundColor: theme.colors.positive,
  }),
  ...($status === "error" && {
    backgroundColor: theme.colors.negative,
  }),
}));
