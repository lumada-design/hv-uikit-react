import { HvCard, HvTypography } from "@hitachivantara/uikit-react-core";
import { theme } from "@hitachivantara/uikit-styles";

export const Kpi2 = ({ title, value }) => {
  return (
    <HvCard style={{ outline: "none" }}>
      <div style={{ padding: theme.space.sm }}>
        <HvTypography variant="label">{title}</HvTypography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <HvTypography variant="caption1">{value}</HvTypography>
        </div>
      </div>
    </HvCard>
  );
};
