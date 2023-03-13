import {
  HvBox,
  HvButton,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Draw, MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";
import { ButtonConfigurator } from "../ButtonConfigurator";

export const Buttons = () => {
  return (
    <>
      <ButtonConfigurator />
      <HvBox sx={{ display: "flex", gap: 20 }}>
        <HvButton icon variant="primary">
          <MoreOptionsVertical />
        </HvButton>
        <HvButton icon variant="primarySubtle">
          <MoreOptionsVertical />
        </HvButton>
        <HvButton icon variant="primaryGhost">
          <MoreOptionsVertical />
        </HvButton>
        <HvButton icon variant="secondarySubtle">
          <MoreOptionsVertical />
        </HvButton>
        <HvButton icon variant="secondaryGhost">
          <MoreOptionsVertical />
        </HvButton>
      </HvBox>
      <HvBox sx={{ display: "flex", gap: 20 }}>
        <HvButton
          variant="primary"
          onClick={() => alert("This can be triggered")}
          startIcon={<Draw />}
        >
          Primary
        </HvButton>
        <HvButton variant="primarySubtle" startIcon={<Draw />}>
          Primary Subtle
        </HvButton>
        <HvButton variant="primaryGhost" startIcon={<Draw />}>
          Primary Ghost
        </HvButton>
        <HvButton variant="secondarySubtle" startIcon={<Draw />}>
          Secondary Subtle
        </HvButton>
        <HvButton variant="secondaryGhost" startIcon={<Draw />}>
          Secondary Ghost
        </HvButton>
      </HvBox>
      <HvBox sx={{ display: "flex", gap: 20 }}>
        <HvButton disabled variant="primary" startIcon={<Draw />}>
          Primary
        </HvButton>
        <HvButton disabled variant="primarySubtle" startIcon={<Draw />}>
          Primary Subtle
        </HvButton>
        <HvButton disabled variant="primaryGhost" startIcon={<Draw />}>
          Primary Ghost
        </HvButton>
        <HvButton
          disabled
          overrideIconColors={false}
          variant="secondarySubtle"
          startIcon={<Draw />}
        >
          Secondary Subtle
        </HvButton>
        <HvButton
          disabled
          overrideIconColors={false}
          variant="secondaryGhost"
          startIcon={<Draw />}
        >
          Secondary Ghost
        </HvButton>
      </HvBox>
      <HvBox sx={{ display: "flex", gap: 20, backgroundColor: "#D3E3F6" }}>
        <HvTypography variant="title1">Semantic</HvTypography>
        <HvButton variant="semantic" startIcon={<Draw />}>
          Primary
        </HvButton>
      </HvBox>
    </>
  );
};
