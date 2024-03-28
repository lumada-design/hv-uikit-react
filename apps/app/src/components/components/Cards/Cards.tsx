import {
  HvBox,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCardMedia,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export const Cards = () => {
  return (
    <HvBox sx={{ display: "flex", flexDirection: "row", gap: theme.space.md }}>
      <HvCard
        bgcolor="atmo1"
        statusColor="negative"
        style={{ width: 360 }}
        selectable
      >
        <HvCardHeader
          title="Asset Avatar L90"
          subheader="Compressor"
          aria-label="Compressor"
        />
        <HvCardMedia
          component="img"
          alt="Compressor"
          height={140}
          image="https://i.imgur.com/bxPPTD3.png"
        />
        <HvCardContent>
          <div style={{ paddingTop: "20px" }}>
            <HvTypography variant="label">ID</HvTypography>
            <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
      </HvCard>
      <HvCard
        bgcolor="atmo1"
        style={{ width: 360, cursor: "pointer", height: 200 }}
        tabIndex={0}
        role="button"
        aria-selected={undefined}
        statusColor="positive"
      >
        <HvCardHeader title="Asset Avatar L90" subheader="Compressor" />
        <HvCardContent>
          <div>
            <HvTypography variant="label">ID</HvTypography>
            <HvTypography>2101cad3-7cd4-1000-bdp95-d8c497176e7c</HvTypography>
          </div>
          <div style={{ marginTop: "20px" }}>
            <HvTypography variant="label">Last connected</HvTypography>
            <HvTypography>Aug 30, 2017 12:27:53 PM</HvTypography>
          </div>
        </HvCardContent>
      </HvCard>
    </HvBox>
  );
};
