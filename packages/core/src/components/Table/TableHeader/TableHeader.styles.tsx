import styled from "@emotion/styled";
import {
  HvButton,
  HvButtonProps,
  HvTypography,
  HvTypographyProps,
} from "@core/components";
import { transientOptions } from "@core/utils/transientOptions";
import { Ref, forwardRef } from "react";
import { PolymorphicRef } from "@core/types";
import tableHeaderClasses from "./tableHeaderClasses";

export const StyledHeaderContent = styled(
  "div",
  transientOptions
)(({ $align }: { $align: string }) => ({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
  // align
  ...($align === "center" && {
    justifyContent: "center",
  }),
  ...($align === "justify" && {
    textAlign: "justify",
  }),
  ...($align === "left" && {
    justifyContent: "flex-start",
  }),
  ...($align === "right" && {
    justifyContent: "flex-end",
  }),
}));

export const StyledButton = styled(
  forwardRef((props: HvButtonProps, ref?: PolymorphicRef<"button">) => {
    return <HvButton {...props} ref={ref} />;
  })
)({
  [`.${tableHeaderClasses.root}.${tableHeaderClasses.sortable}`]: {
    boxShadow: "none",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "red",
    },
  },
});

export const StyledTypography = styled(
  forwardRef((props: HvTypographyProps, ref?: Ref<HTMLElement>) => {
    return <HvTypography {...props} ref={ref} />;
  }),
  transientOptions
)(
  ({
    $headerText,
    $headerParagraph,
    $sortableHeaderText,
  }: {
    $headerText: boolean;
    $headerParagraph: boolean;
    $sortableHeaderText: boolean;
  }) => ({
    ...($headerText && {
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    ...($headerParagraph && {
      overflow: "hidden",
      display: "-webkit-box",
      // "-webkit-line-clamp": 2,
      // "-webkit-box-orient": "vertical",
    }),
    ...($sortableHeaderText && {
      paddingTop: "8px",
    }),
  })
);

export const StyledResizer = styled("div")({
  display: "inline-block",
  width: 10,
  height: "100%",
  position: "absolute",
  right: 0,
  top: 0,
  transform: "translateX(50%)",
  zIndex: 1,
  touchAction: "none",
});
