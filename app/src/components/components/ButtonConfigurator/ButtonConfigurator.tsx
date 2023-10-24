import { useState } from "react";
import {
  HvButtonSize,
  HvButtonVariant,
  HvBox,
  HvButton,
  HvDropdown,
  HvTypography,
  HvButtonRadius,
  HvListValue,
} from "@hitachivantara/uikit-react-core";

const sizes: HvButtonSize[] = ["xs", "sm", "md", "lg", "xl"];

const variants: HvButtonVariant[] = [
  "primary",
  "primarySubtle",
  "primaryGhost",
  "secondary",
  "secondarySubtle",
  "secondaryGhost",
];

export const ButtonConfigurator = () => {
  const [variant, setVariant] = useState<HvButtonVariant>("primary");
  const [size, setSize] = useState<HvButtonSize>("md");
  const [radius, setRadius] = useState<HvButtonRadius>("base");

  return (
    <HvBox sx={{ display: "flex", gap: 20, height: 70 }}>
      <HvTypography>Variant: </HvTypography>
      <HvDropdown
        css={{ width: 150 }}
        values={variants.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(item) => {
          setVariant((item as HvListValue).value as HvButtonVariant);
        }}
      />
      <HvTypography>Sizes: </HvTypography>
      <HvDropdown
        css={{ width: 150 }}
        values={sizes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(item) => {
          setSize((item as HvListValue)?.value);
        }}
      />
      <HvTypography>Radius: </HvTypography>
      <HvDropdown
        css={{ width: 150 }}
        values={sizes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(item) => {
          setRadius((item as HvListValue).value);
        }}
      />
      <HvButton variant={variant} size={size} radius={radius}>
        teste
      </HvButton>
    </HvBox>
  );
};
