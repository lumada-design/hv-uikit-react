import { createClasses, theme } from "@hitachivantara/uikit-react-core";

export const { staticClasses, useClasses } = createClasses("HvFlowBaseNode", {
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
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: theme.colors.base_dark,
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
  contentContainer: {},
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
