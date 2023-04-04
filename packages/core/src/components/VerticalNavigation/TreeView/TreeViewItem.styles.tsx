import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvTypography } from "~/components";
import { outlineStyles } from "~/utils";
import treeViewItemClasses from "./treeViewItemClasses";

const selected = () => ({
  background: theme.colors.atmo3,
  borderLeft: theme.verticalNavigation.activeBorderLeft,
  "& *": {
    background: theme.colors.atmo3,
  },
});

const hover = () => ({
  background: theme.verticalNavigation.hoverColor,
  "& *": {
    background: theme.verticalNavigation.hoverColor,
  },
});

export const StyledGroup = styled("ul")({
  margin: "8px 0 0 0",
  padding: 0,
});

export const StyledNode = styled("li")({
  listStyle: "none",
  minHeight: "32px",
  "&:not(:last-child)": {
    marginBottom: "8px",
  },
  [`&.${treeViewItemClasses.collapsed}`]: {
    [`&>.${treeViewItemClasses.group}`]: {
      display: "none",
    },
  },
  [`&.${treeViewItemClasses.expanded}`]: {
    [`&>.${treeViewItemClasses.group}`]: {
      display: "block",
    },
  },
  [`&.${treeViewItemClasses.link}`]: {
    textDecoration: "none",
  },
  [`&.${treeViewItemClasses.hide}`]: {
    display: "none",
  },
});

export const StyledContent = styled(HvTypography)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "32px",
  borderLeft: theme.verticalNavigation.inactiveBorderLeft,
  paddingRight: theme.space.xs,

  [`&.${treeViewItemClasses.minimized}`]: {
    justifyContent: "center",
    paddingRight: 0,
  },

  [`.${treeViewItemClasses.expandable}>&`]: {
    fontWeight: 600,
  },

  // selected state
  [`.${treeViewItemClasses.selected}>&`]: selected(),

  //hover
  [`:not(.${treeViewItemClasses.disabled} > &):not(.${treeViewItemClasses.selected} > &):hover`]:
    hover(),
  [`:not(.${treeViewItemClasses.disabled} > &).${treeViewItemClasses.selected} >:hover`]:
    {},

  // focus
  [`:not(.${treeViewItemClasses.disabled}>&):not(.${treeViewItemClasses.selected}>&):focus-visible`]:
    hover(),
  [`:not(.${treeViewItemClasses.disabled}>&):not(.${treeViewItemClasses.selected}>&).focus-visible`]:
    hover(),

  [`*:focus-visible .${treeViewItemClasses.focused}>&`]: {
    ...outlineStyles,
  },

  [` .focus-visible .${treeViewItemClasses.focused}>&`]: {
    ...outlineStyles,
  },

  [` .${treeViewItemClasses.focused}>&`]: {
    ...hover(),
  },

  "&[disabled], &:active": {
    outline: "none",
  },

  "&:focus": {
    outline: "none",
  },

  "&:focus-visible": {
    ...outlineStyles,
  },

  "&.focus-visible": {
    ...outlineStyles,
  },

  // cursor
  cursor: "pointer",
  "& *": {
    cursor: "pointer",
  },
  [` .${treeViewItemClasses.disabled}>&`]: {
    cursor: "not-allowed",
    "& *": {
      cursor: "not-allowed",
    },
  },
});
