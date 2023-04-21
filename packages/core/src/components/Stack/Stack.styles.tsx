import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "@core/utils/transientOptions";

export const StyledRoot = styled(
  "div",
  transientOptions
)(
  ({
    $direction,
    $breakpoint,
  }: {
    $direction: string;
    $breakpoint: string;
  }) => ({
    display: "flex",
    ...($direction === "column" && {
      flexDirection: "column",
    }),
    ...($direction === "row" && {
      flexDirection: "row",
    }),
    ...($breakpoint === "xs" && {
      gap: theme.space.xs,
    }),
    ...($breakpoint === "sm" && {
      gap: theme.space.sm,
    }),
    ...($breakpoint === "md" && {
      gap: theme.spacing(4),
    }),
    ...($breakpoint === "lg" && {
      gap: theme.spacing(6),
    }),
    ...($breakpoint === "xl" && {
      gap: theme.spacing(11),
    }),
  })
);
