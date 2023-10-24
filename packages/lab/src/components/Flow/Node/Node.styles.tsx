import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvFlowNode", {
  root: {
    borderRadius: theme.radii.round,
    backgroundColor: theme.colors.atmo1,
    boxShadow: theme.colors.shadow,
    minWidth: "250px",
  },
  headerContainer: {
    padding: theme.spacing(0.5, 1),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: theme.radii.round,
    borderTopRightRadius: theme.radii.round,
  },
  groupContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  group: {
    color: theme.colors.base_dark,
  },
  titleContainer: {
    minHeight: 48,
    padding: theme.spacing(
      theme.space.xs,
      theme.space.xs,
      theme.space.xs,
      theme.space.sm
    ),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
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
  contentContainer: {
    padding: theme.space.sm,
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
  paramsContainer: {
    borderTop: `1px solid ${theme.colors.atmo4}`,
    display: "flex",
    flexDirection: "column",
    gap: theme.space.xs,
    padding: theme.space.sm,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  outputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  mandatory: {
    width: 10,
    height: 10,
    margin: theme.spacing(0, theme.space.xs),
    borderRadius: theme.radii.circle,
    backgroundColor: theme.colors.negative_20,
  },
});
