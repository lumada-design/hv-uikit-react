import {
  HvBox,
  HvTag,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export const Tags = () => {
  return (
    <HvBox
      css={{ display: "flex", flexDirection: "column", gap: theme.space.md }}
    >
      <HvBox
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.xs,
        }}
      >
        <HvTypography variant="title4">Categorical</HvTypography>
        <HvBox css={{ display: "flex", gap: theme.space.md }}>
          <HvTag label="Label" type="categorical" color="cat1" />
          <HvTag label="Label" type="categorical" color="cat2" />
          <HvTag label="Label" type="categorical" color="cat3" />
          <HvTag label="Label" type="categorical" color="cat4" />
          <HvTag label="Label" type="categorical" color="cat5" />
          <HvTag label="Label" type="categorical" color="#22FF45" />
        </HvBox>
      </HvBox>
      <HvBox
        style={{
          display: "flex",
          flexDirection: "column",
          gap: theme.space.xs,
        }}
      >
        <HvTypography variant="title4">Semantic</HvTypography>
        <HvBox css={{ display: "flex", gap: theme.space.md }}>
          <HvTag label="Label" type="semantic" color="neutral_20" />
          <HvTag label="Label" type="semantic" color="positive_20" />
          <HvTag label="Label" type="semantic" color="negative_20" />
          <HvTag label="Label" type="semantic" color="warning_20" />
        </HvBox>
      </HvBox>
    </HvBox>
  );
};
