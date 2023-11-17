import { theme } from "@hitachivantara/uikit-styles";

import { createClasses } from "@core/utils/classes";

export const { staticClasses, useClasses } = createClasses("HvAppSwitcher", {
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.atmo1,
    overflow: "hidden",

    // we need to play with the 4px because of the focus ring
    // padding: `${theme.spacing(2) - 4}px 0 ${theme.spacing(2) - 4}px ${
    //   theme.spacing(2) - 4
    // }px`,
    padding: theme.spacing("sm", 0, "sm", "sm"),
  },
  item: {},
  itemSelected: {},
  itemDisabled: {},
  itemTrigger: {},
  itemIcon: {},
  itemTitle: {},
  itemInfoIcon: {},
  actionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",

    overflowY: "auto",

    // We need to play with the 4px because of the focus ring
    padding: "4px 0 4px 4px",
  },
  footerContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
    height: 52,

    // We need to play with the 4px because of the focus ring
    // padding: `${theme.hv.spacing.sm - 4}px ${theme.hv.spacing.sm + 4}px 4px 4px`,
    padding: `${theme.space.sm} ${theme.space.sm} 4px 4px`,
  },
  open: {
    zIndex: "1200",
    position: "absolute",
    top: "50px",
    overflowX: "hidden",
    boxShadow: theme.colors.shadow,
  },
  closed: { display: "none" },
  title: {
    minHeight: 36,

    // we need to play with the 4px because of the focus ring
    // padding: `4px ${theme.hv.spacing.sm}px ${theme.hv.spacing.sm - 4}px 4px`,
    padding: `4px ${theme.space.sm} ${theme.space.sm} 4px`,
    ...theme.typography.label,
  },
  titleAnchor: {
    WebkitLineClamp: 2,
  },
  single: { width: 320 },
  dual: { width: 640 },
  fluid: {},
});
