import {
  HvProgressBar,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export const ProgressBar = () => {
  return (
    <div className="flex flex-col gap-md w-80% m-auto items-center">
      <div className="flex gap-xs w-full">
        <div className="w-100px">
          <HvTypography variant="title4">Success</HvTypography>
        </div>
        <div className="flex gap-md flex-1">
          <HvProgressBar value={100} status="completed" />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: theme.space.xs,
          width: "100%",
        }}
      >
        <div className="w-100px">
          <HvTypography variant="title4">Loading</HvTypography>
        </div>
        <div className="flex gap-md flex-1">
          <HvProgressBar value={40} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: theme.space.xs,
          width: "100%",
        }}
      >
        <div className="w-100px">
          <HvTypography variant="title4">Error</HvTypography>
        </div>
        <div className="flex gap-md flex-1">
          <HvProgressBar value={30} status="error" />
        </div>
      </div>
    </div>
  );
};
