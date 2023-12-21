import { useState } from "react";
import {
  HvBox,
  HvCheckBox,
  HvTypography,
  HvTypographyVariants,
  theme,
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
] as HvTypographyVariants[];

export const Typography = () => {
  const [isLink, setIsLink] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <HvBox>
      <HvBox
        sx={{
          marginBottom: theme.space.sm,
          display: "flex",
          flexDirection: "row",
          gap: theme.spacing(4),
        }}
      >
        <HvCheckBox label="Link" onChange={() => setIsLink((c) => !c)} />
        <HvCheckBox
          label="Disabled"
          onChange={() => setIsDisabled((c) => !c)}
        />
      </HvBox>
      <HvBox sx={{ marginBottom: theme.space.sm }}>
        {variants.map((variant: HvTypographyVariants) => {
          return (
            <HvBox key={`key_${variant}`} sx={{ marginBottom: theme.space.xs }}>
              <HvTypography variant="label" key={`label_${variant}`}>
                {variant}
              </HvTypography>
              <br />
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
