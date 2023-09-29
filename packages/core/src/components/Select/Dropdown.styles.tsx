import { theme } from "@hitachivantara/uikit-styles";
import { createClasses } from "@core/utils/classes";
import { outlineStyles } from "@core/utils/focusUtils";

export const { staticClasses, useClasses } = createClasses("HvDropdown", {
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
  disabledTriggerContainer: {
    cursor: "not-allowed",
    pointerEvents: "none",
    border: `1px solid ${theme.colors.secondary_60}`,
    background: theme.colors.atmo2,
    "&:hover": {
      border: `1px solid ${theme.colors.secondary_60}`,
    },
  },
  invalidTriggerContainer: {
    border: `1px solid ${theme.colors.negative}`,
    "&:hover": {
      border: `1px solid ${theme.colors.negative}`,
    },
  },
  readOnlyTriggerContainer: {
    cursor: "default",
    "&:hover": {
      border: `1px solid ${theme.colors.secondary_80}`,
    },
  },
  multipleValueContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: { paddingBottom: "6px" },
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
  checkboxLabel: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  highlightedItem: {
    backgroundColor: theme.colors.primary_20,
  },
  selectedItem: {
    backgroundColor: theme.colors.primary_20,
  },
  search: {
    marginBottom: theme.space.xs,
  },
  itemLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    padding: theme.spacing(0, "xs"),
  },
  itemIcon: { marginRight: `calc(${theme.space.xs} * -1)` },
});
