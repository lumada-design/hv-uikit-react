import {
  ButtonSize,
  ButtonVariant,
  HvBox,
  HvButton,
  HvDropdown,
  HvTypography,
  ButtonRadius,
} from "@hitachivantara/uikit-core";
import { useState } from "react";

const sizes: ButtonSize[] = ["xs", "sm", "md", "lg", "xl"];

const variants: ButtonVariant[] = [
  "primary",
  "primarySubtle",
  "primaryGhost",
  "secondary",
  "secondarySubtle",
  "secondaryGhost",
];

export const ButtonConfigurator = () => {
  const [variant, setVariant] = useState<ButtonVariant>("primary");
  const [size, setSize] = useState<ButtonSize>("md");
  const [radius, setRadius] = useState<ButtonRadius>("base");

  return (
    <HvBox sx={{ display: "flex", gap: 20, height: 70 }}>
      <HvTypography>Variant: </HvTypography>
      <HvDropdown
        css={{ width: 150 }}
        value={variant}
        options={variants.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(value: string) => {
          setVariant(value as ButtonVariant);
        }}
      />
      <HvTypography>Sizes: </HvTypography>
      <HvDropdown
        css={{ width: 150 }}
        value={size}
        options={sizes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(value: string) => {
          setSize(value as ButtonSize);
        }}
      />
      <HvTypography>Radius: </HvTypography>
      <HvDropdown
        css={{ width: 150 }}
        value={radius}
        options={sizes.map((name) => ({
          value: name,
          label: name,
        }))}
        onChange={(value: string) => {
          setRadius(value as ButtonRadius);
        }}
      />
      <HvButton variant={variant} size={size} radius={radius}>
        teste
      </HvButton>
    </HvBox>
  );
};
