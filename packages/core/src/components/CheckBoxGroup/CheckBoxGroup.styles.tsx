import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { HvFormElement, HvLabel } from "components";
import { transientOptions } from "utils/transientOptions";

export const StyledFormElement = styled(HvFormElement)({
  display: "inline-block",
  padding: 0,
  margin: 0,
  overflow: "hidden",
  verticalAlign: "top",
});

export const StyledLabel = styled(HvLabel)({
  marginBottom: theme.spacing(1.25),
});

export const StyledGroupContainer = styled(
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

      "&>*:not(:first-child)": {
        marginLeft: theme.spacing(2.5),
      },
    }),

    ...($invalid && {
      paddingBottom: theme.spacing(1.25),
      borderBottom: `1px solid ${theme.colors.sema4}`,
    }),
  })
);
