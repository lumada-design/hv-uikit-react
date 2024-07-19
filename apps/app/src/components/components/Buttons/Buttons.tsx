import {
  HvButton,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Draw, MoreOptionsVertical } from "@hitachivantara/uikit-react-icons";

export const Buttons = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: theme.space.md }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.xs,
        }}
      >
        <HvTypography variant="title4">Default</HvTypography>
        <div style={{ display: "flex", gap: theme.space.md }}>
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
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.xs,
        }}
      >
        <HvTypography variant="title4">Disabled</HvTypography>
        <div style={{ display: "flex", gap: theme.space.md }}>
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.xs,
        }}
      >
        <HvTypography variant="title4">Icons</HvTypography>
        <div
          style={{ display: "flex", gap: theme.space.md, alignItems: "center" }}
        >
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.xs,
        }}
      >
        <HvTypography variant="title4">Semantic</HvTypography>
        <div style={{ backgroundColor: "#D3E3F6" }}>
          <HvButton variant="semantic" startIcon={<Draw />}>
            Semantic
          </HvButton>
        </div>
      </div>
    </div>
  );
};
