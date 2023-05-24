import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "@core/utils/transientOptions";
import fade from "@core/utils/hexToRgbA";
import { HvActionsGeneric, HvActionsGenericProps } from "@core/components";
import bulkActionsClasses from "./bulkActionsClasses";

export const StyledRoot = styled(
  "div",
  transientOptions
)(
  ({
    $isSemantic,
    $baseColor,
  }: {
    $isSemantic: boolean;
    $baseColor: string;
  }) => ({
    display: "flex",
    alignItems: "center",
    border: theme.bulkActions.border,
    backgroundColor: theme.bulkActions.backgroundColor,
    padding: theme.bulkActions.padding,
    marginBottom: theme.space.xs,

    ...($isSemantic && {
      backgroundColor: theme.bulkActions.anySelectedBackgroundColor,

      [`& .${bulkActionsClasses.selectAll} div`]: {
        color: theme.colors.base_dark,

        "&:hover:not(:disabled)": {
          backgroundColor: fade($baseColor, 0.3),
        },

        "& *": {
          color: theme.colors.base_dark,
          backgroundColor: "transparent",
        },
      },

      [`& .${bulkActionsClasses.selectAll}:focus-within div`]: {
        backgroundColor: fade($baseColor, 0.3),
      },

      // IE fallback code (using focus-within-polyfill)
      [`& .${bulkActionsClasses.selectAll}.focus-within div`]: {
        backgroundColor: fade($baseColor, 0.3),
      },
    }),
  })
);

export const StyledSelectAllContainer = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const StyledGenericActions = styled((props: HvActionsGenericProps) => (
  <HvActionsGeneric {...props} />
))({
  display: "inline-flex",
  marginLeft: "auto",
});

export const StyledDivider = styled("div")({
  display: theme.bulkActions.separatorDisplay,
  backgroundColor: theme.colors.atmo4,
  width: "1px",
  height: "32px",
  marginLeft: theme.space.sm,
});
