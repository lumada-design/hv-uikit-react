import {
  HvButtonSize,
  HvButtonVariant,
  HvBox,
  HvButton,
  HvDropdown,
  HvTypography,
  HvButtonRadius,
} from "@hitachivantara/uikit-core";
import { useState } from "react";

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
          setVariant(item.value as HvButtonVariant);
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
          setSize(item?.value);
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
          setRadius(item.value);
        }}
      />
      <HvButton variant={variant} size={size} radius={radius}>
        teste
      </HvButton>
    </HvBox>
  );
};
