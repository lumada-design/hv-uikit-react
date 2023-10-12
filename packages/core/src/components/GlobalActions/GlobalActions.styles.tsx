import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvGlobalActions", {
  root: {
    position: "relative",
  },
  positionSticky: {
    width: "100%",
    position: "sticky",
  },
  positionFixed: {
    width: "100%",
    position: "fixed",
  },
  global: {
    zIndex: `calc(${theme.zIndices.banner} - 2)`,
    top: 0,
    left: 0,
    padding: theme.spacing(1, 0),
    backdropFilter: "blur(1px)",

    "&:before": {
      content: "''",
      display: "flex",
      position: "absolute",
      inset: 0,
      background: theme.colors.atmo2,
      opacity: "75%",
    },
  },
  wrapper: {
    padding: theme.space.sm,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    border: `1px solid ${theme.colors.atmo4}`,
    borderRadius: theme.radii.round,
  },
  globalWrapperComplement: {
    position: "relative",
    top: 0,
    left: 0,
    background: theme.colors.atmo1,
    width: "100%",
  },
  globalSectionArea: {
    backgroundColor: theme.colors.atmo1,
    borderTop: `1px solid ${theme.colors.atmo4}`,
    paddingLeft: theme.space.sm,
  },
  backButton: {
    marginRight: theme.space.xs,
  },
  name: {
    flexGrow: 1,
  },
  sectionName: {
    ...theme.typography.title4,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    gap: theme.space.xs,
  },
});
