import styled from "@emotion/styled";
import {
  HvListItem,
  HvOverflowTooltip,
  HvOverflowTooltipProps,
  listItemClasses,
} from "@core/components";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledListItem = styled(HvListItem)({
  display: "flex",
  alignItems: "center",
  borderLeft: theme.verticalNavigation.inactiveBorderLeft,
  minHeight: "48px",
  marginBottom: "8px",
  "& > button": {
    marginLeft: "auto",
  },

  [`&.${listItemClasses.selected}`]: {
    background: theme.colors.atmo3,
    borderLeft: theme.verticalNavigation.activeBorderLeft,
    "& *": {
      background: theme.colors.atmo3,
    },
  },

  [`&.${listItemClasses.focus}`]: {
    background: theme.colors.atmo3,
    "& *": {
      background: theme.colors.atmo3,
    },
  },
});

export const StyledOverflowTooltip = styled(
  (props: HvOverflowTooltipProps) => <HvOverflowTooltip {...props} />,
  transientOptions
)(({ $hasEndAdornment }: { $hasEndAdornment: boolean }) => ({
  ...(!$hasEndAdornment && {
    paddingRight: theme.space.xs,
  }),
}));
