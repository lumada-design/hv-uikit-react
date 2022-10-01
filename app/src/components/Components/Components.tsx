import React from "react";
import {
  HvTypography,
  TypographyVariant,
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
] as TypographyVariant[];

export const Components: React.FC = () => {
  return (
    <>
      {variants.map((variant: TypographyVariant) => {
        return (
          <React.Fragment key={`key_${variant}`}>
            <HvTypography variant="label" key={`label_${variant}`}>
              {variant}
            </HvTypography>
            <HvTypography variant={variant} key={variant}>
              Welcome to NEXT Design System!
            </HvTypography>
          </React.Fragment>
        );
      })}
    </>
  );
};

if (process.env.NODE_ENV !== "production") {
  Components.displayName = "Components";
}
