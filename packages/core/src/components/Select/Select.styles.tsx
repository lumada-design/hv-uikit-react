import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@core/utils/classes";
import { outlineStyles } from "@core/utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvSelect", {
  triggerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    padding: theme.spacing(0, 0, 0, "xs"),
    background: theme.colors.atmo1,
    border: `1px solid ${theme.colors.secondary_80}`,
    borderRadius: theme.radii.base,

    "&:hover": {
      border: `1px solid ${theme.colors.primary}`,
    },

    "&:focus-visible": {
      ...outlineStyles,
      border: `1px solid ${theme.colors.primary}`,
    },

    ...theme.typography.body,

    "& p": {
      width: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  placeholder: { color: theme.colors.secondary_80 },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.atmo1,
    border: `1px solid ${theme.colors.secondary_80}`,
    borderRadius: theme.radii.base,
    padding: theme.space.sm,

    // https://www.radix-ui.com/primitives/docs/components/popover#constrain-the-content-size
    width: "var(--radix-popover-trigger-width)",
    maxHeight: "var(--radix-popover-content-available-height)",

    "&[data-side=bottom]": {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },

    "&[data-side=top]": {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  itemContainer: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 32,

    "&:hover": { backgroundColor: theme.colors.primary_20 },
  },
  itemLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: theme.spacing(0, "xs"),
  },
  itemIcon: { marginRight: `calc(${theme.space.xs} * -1)` },
  highlightedItem: {
    backgroundColor: theme.colors.primary_20,
  },
  selectedItem: {
    backgroundColor: theme.colors.primary_20,
  },
});
