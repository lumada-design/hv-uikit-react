import {
  HvBox,
  HvCheckBox,
  HvTypography,
  HvTypographyLegacyVariants,
  HvTypographyVariants,
  theme,
} from "@hitachivantara/uikit-core";
import { useState } from "react";

const variants = [
  "display",
  // "3xlTitle",
  "title1",
  // "xlTitle",
  "title2",
  // "mTitle",
  "title3",
  // "xsTitle",
  "title4",
  "body",
  // "normalText",
  "label",
  // "highlightText",
  "caption1",
  // "vizText",
  "caption2",
] as HvTypographyVariants[];

const legacyVariants = [
  "5xlTitle",
  "4xlTitle",
  "xxlTitle",
  "lTitle",
  "sTitle",
  "xxsTitle",
  "sectionTitle",
  "placeholderText",
] as HvTypographyLegacyVariants[];

export const Typography = () => {
  const [isLink, setIsLink] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <HvBox>
      <HvBox
        sx={{
          marginBottom: theme.spacing(5),
          display: "flex",
          flexDirection: "row",
          gap: theme.spacing(4),
        }}
      >
        <HvCheckBox
          label="Link"
          onChange={() => setIsLink((c) => !c)}
        ></HvCheckBox>
        <HvCheckBox
          label="Disabled"
          onChange={() => setIsDisabled((c) => !c)}
        ></HvCheckBox>
      </HvBox>
      <HvBox sx={{ marginBottom: theme.spacing(7) }}>
        {variants.map((variant: HvTypographyVariants) => {
          return (
            <HvBox
              key={`key_${variant}`}
              sx={{ marginBottom: theme.spacing(1) }}
            >
              <HvTypography variant="label" key={`label_${variant}`}>
                {variant}
              </HvTypography>
              <HvTypography
                variant={variant}
                key={variant}
                link={isLink}
                disabled={isDisabled}
              >
                Welcome to NEXT Design System!
              </HvTypography>
            </HvBox>
          );
        })}
      </HvBox>
      <HvBox>
        {legacyVariants.map((variant: HvTypographyLegacyVariants) => {
          return (
            <HvBox
              key={`key_${variant}`}
              sx={{ marginBottom: theme.spacing(1) }}
            >
              <HvTypography variant="label" key={`label_${variant}`}>
                {variant}
              </HvTypography>
              <HvTypography
                variant={variant}
                key={variant}
                link={isLink}
                disabled={isDisabled}
              >
                Welcome to NEXT Design System!
              </HvTypography>
            </HvBox>
          );
        })}
      </HvBox>
    </HvBox>
  );
};
