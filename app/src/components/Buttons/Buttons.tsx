import { HvBox, HvButton } from "@hitachivantara/uikit-react-core";

export const Buttons = () => {
  return (
    <HvBox sx={{ display: "flex", gap: 20 }}>
      <HvButton variant="primary">Primary</HvButton>
      <HvButton variant="primarySubtle">Primary Subtle</HvButton>
      <HvButton variant="primaryGhost">Primary Ghost</HvButton>
      <HvButton variant="secondary">Secondary Subtle</HvButton>
      <HvButton variant="secondaryGhost">Secondary Ghost</HvButton>
    </HvBox>
  );
};

if (process.env.NODE_ENV !== "production") {
  Buttons.displayName = "Buttons";
}
