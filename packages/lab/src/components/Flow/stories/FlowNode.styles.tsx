import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvFlowNode", {
  root: {
    borderRadius: theme.radii.round,
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.colors.shadow,
    minWidth: "250px",
  },
  titleContainer: {
    padding: theme.spacing(0.5, 1),
  },
  title: {
    color: theme.colors.base_dark,
  },
  descriptionContainer: { padding: theme.space.sm },
  inputsTitleContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.space.xs,
    backgroundColor: theme.colors.atmo2,
    borderTop: `1px solid ${theme.colors.atmo4}`,
    borderBottom: `1px solid ${theme.colors.atmo4}`,
  },
  outputsTitleContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.space.xs,
    backgroundColor: theme.colors.atmo2,
    borderTop: `1px solid ${theme.colors.atmo4}`,
    borderBottom: `1px solid ${theme.colors.atmo4}`,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.space.sm,
    gap: theme.space.xs,
    alignItems: "flex-start",
  },
  outputsContainer: {
    display: "flex",
    flexDirection: "column",
    padding: theme.space.sm,
    gap: theme.space.xs,
    alignItems: "flex-end",
  },
});
