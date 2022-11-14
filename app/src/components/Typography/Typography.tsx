import {
  HvBox,
  HvTypography,
  TypographyVariants,
  theme,
} from "@hitachivantara/uikit-core";

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

export const Typography = () => {
  return (
    <HvBox>
      {variants.map((variant: TypographyVariants) => {
        return (
          <HvBox key={`key_${variant}`} sx={{ marginBottom: theme.spacing(1) }}>
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
