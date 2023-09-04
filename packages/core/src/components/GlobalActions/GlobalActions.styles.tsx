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
    "&:before": {
      content: "''",
      display: "flex",
      width: "100%",
      height: 72,
      top: 0,
      background: theme.colors.atmo2,
      opacity: "75%",
    },
    backdropFilter: "blur(1px)",
  },
  wrapper: {
    padding: theme.space.sm,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    border: theme.globalActions.border,
    borderRadius: theme.globalActions.borderRadius,
  },
  globalWrapperComplement: {
    position: "absolute",
    top: 0,
    left: 0,
    background: theme.colors.atmo1,
    width: "100%",
    marginTop: theme.space.xs,
  },
  globalSectionArea: {
    backgroundColor: theme.globalActions.sectionBackgroundColor,
    borderTop: `1px solid ${theme.colors.atmo4}`,
    paddingLeft: theme.globalActions.sectionPaddingLeft,
  },
  backButton: {
    marginRight: theme.space.xs,
  },
  name: {
    flexGrow: 1,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    gap: theme.space.xs,
  },
});
