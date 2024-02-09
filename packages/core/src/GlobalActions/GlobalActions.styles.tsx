import { CSSInterpolation } from "@emotion/serialize";
import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "../utils/classes";

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

    "& $wrapper": {
      top: 0,
      left: 0,
      backgroundColor: theme.colors.atmo1,
      width: "100%",
      borderWidth: 1,
      borderRadius: theme.radii.round,
    },
  },
  section: {
    "& $wrapper": {
      borderTopWidth: 1,
      paddingLeft: 0,
    },
  },
  wrapper: {
    padding: theme.space.xs,
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.space.xs,
    borderColor: theme.colors.atmo4,
    paddingLeft: theme.space.sm,
  },

  /** @deprecated use classes.global $wrapper */
  globalSectionArea: {},
  /** @deprecated use classes.section $wrapper */
  globalWrapperComplement: {},
  backButton: {},
  name: {
    flexGrow: 1,
  },
  /** @deprecated use classes.name */
  sectionName: {},
  actions: {
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
    // TODO: remove in v6 in favour of consistently setting `flexGrow: 1` in a title "wrapper"
    marginLeft: "auto",
  },
});

export const getBreakpointStyles = (
  isUpMd: boolean,
  isSmDown: boolean
): CSSInterpolation => {
  const unit = isUpMd ? 4 : isSmDown ? 2 : 0;
  if (!unit) return {};

  return {
    width: `calc(100% - 2 * ${theme.spacing(unit)})`,
    marginLeft: theme.spacing(unit),
    marginRight: theme.spacing(unit),
  };
};
