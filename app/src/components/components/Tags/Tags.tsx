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
          <HvTag label="Label" type="categorical" color="cviz1" />
          <HvTag label="Label" type="categorical" color="cviz2" />
          <HvTag label="Label" type="categorical" color="cviz3" />
          <HvTag label="Label" type="categorical" color="cviz4" />
          <HvTag label="Label" type="categorical" color="cviz5" />
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
          <HvTag label="Label" type="semantic" color="sema7" />
          <HvTag label="Label" type="semantic" color="sema8" />
          <HvTag label="Label" type="semantic" color="sema9" />
          <HvTag label="Label" type="semantic" color="sema20" />
        </HvBox>
      </HvBox>
    </HvBox>
  );
};
