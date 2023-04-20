import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvFormElement, HvFormElementProps, HvLabel } from "@core/components";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledFormElement = styled((props: HvFormElementProps) => (
  <HvFormElement {...props} />
))({
  display: "inline-block",
  padding: 0,
  margin: 0,
  overflow: "hidden",
  verticalAlign: "top",
});

export const StyledLabel = styled(HvLabel)({
  marginBottom: theme.space.xs,
});

export const StyledGroup = styled(
  "div",
  transientOptions
)(
  ({
    $vertical,
    $horizontal,
    $invalid,
  }: {
    $vertical: boolean;
    $horizontal: boolean;
    $invalid: boolean;
  }) => ({
    display: "flex",

    ...($vertical && {
      flexDirection: "column",

      // Prevent the focus ring to be hidden by sibling hover background
      "&>*": {
        zIndex: 0,
      },
      "&>*:focus-within": {
        zIndex: 1,
      },
      // IE fallback code (using focus-within-polyfill)
      "&>*.focus-within": {
        zIndex: 1,
      },
    }),

    ...($horizontal && {
      flexDirection: "row",
      flexWrap: "wrap",
      "&>*:not(:first-of-type)": {
        marginLeft: theme.space.sm,
      },
      width: `calc(100% + ${theme.space.sm})`, // Compensate the negative margin left which increases the width
    }),

    ...($invalid && {
      paddingBottom: theme.space.xs,
      borderBottom: `1px solid ${theme.colors.negative}`,
    }),
  })
);
