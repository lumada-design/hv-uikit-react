import { HvTag, HvTypography, theme } from "@hitachivantara/uikit-react-core";

export const Tags = () => {
  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <HvTypography variant="title4">Categorical</HvTypography>
        <div className="flex gap-md">
          <HvTag label="Label" type="categorical" color="cat1" />
          <HvTag label="Label" type="categorical" color="cat2" />
          <HvTag label="Label" type="categorical" color="cat3" />
          <HvTag label="Label" type="categorical" color="cat4" />
          <HvTag label="Label" type="categorical" color="cat5" />
          <HvTag label="Label" type="categorical" color="#22FF45" />
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
        <div className="flex gap-md">
          <HvTag label="Label" type="semantic" color="neutral_20" />
          <HvTag label="Label" type="semantic" color="positive_20" />
          <HvTag label="Label" type="semantic" color="negative_20" />
          <HvTag label="Label" type="semantic" color="warning_20" />
        </div>
      </div>
    </div>
  );
};
