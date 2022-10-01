import React from "react";
import {
  HvBox,
  HvTypography,
  TypographyVariants,
  themeUtils,
} from "@hitachivantara/uikit-react-core";

const variants = [
  "display",
  "title1",
  "title2",
  "title3",
  "title4",
  "body",
  "label",
  "caption1",
  "caption2",
] as TypographyVariants[];

export const Typography: React.FC = () => {
  return (
    <HvBox>
      {variants.map((variant: TypographyVariants) => {
        return (
          <HvBox
            key={`key_${variant}`}
            sx={{ marginBottom: themeUtils.space(1) }}
          >
            <HvTypography variant="label" key={`label_${variant}`}>
              {variant}
            </HvTypography>
            <HvTypography variant={variant} key={variant}>
              Welcome to NEXT Design System!
            </HvTypography>
          </HvBox>
        );
      })}
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  Typography.displayName = "Typography";
}
