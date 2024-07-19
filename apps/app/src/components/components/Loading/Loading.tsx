import {
  HvLoading,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export const Loading = () => {
  return (
    <div className="flex gap-sm w-80% m-auto items-center justify-between">
      <div className="flex gap-xs w-full justify-center">
        <div className="w-80px">
          <HvTypography variant="title4">Default</HvTypography>
        </div>
        <div className="flex gap-md">
          <HvLoading />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: theme.space.xs,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div className="w-80px">
          <HvTypography variant="title4">Small</HvTypography>
        </div>
        <div className="flex gap-md">
          <HvLoading small />
        </div>
      </div>
    </div>
  );
};
