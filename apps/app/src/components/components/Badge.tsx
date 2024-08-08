import { HvBadge, HvTypography, theme } from "@hitachivantara/uikit-react-core";
import { Alert } from "@hitachivantara/uikit-react-icons";

export const Badge = () => {
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
        <HvTypography variant="title4">No icons</HvTypography>
        <div
          style={{ display: "flex", gap: theme.space.md, alignItems: "center" }}
        >
          <HvBadge id="badge1" count={1} />
          <HvBadge id="badge2" showCount count={8} />
          <HvBadge id="badge3" showCount count={22} />
          <HvBadge id="badge4" showCount count={100} />
          <HvBadge id="labelBadge1" label="100%" />
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
          <HvBadge id="badge5" count={0} icon={<Alert />} />
          <HvBadge id="badge6" count={1} icon={<Alert />} />
          <HvBadge id="badge7" showCount count={8} icon={<Alert />} />
          <HvBadge id="badge8" showCount count={88} icon={<Alert />} />
          <HvBadge id="badge9" showCount count={888} icon={<Alert />} />
          <HvBadge id="labelBadge3" label="100%" icon={<Alert />} />
        </div>
      </div>
    </div>
  );
};
