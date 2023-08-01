import { HvCard, HvTypography, theme } from "@hitachivantara/uikit-react-core";

export const Kpi3 = ({ children, title }) => {
  return (
    <HvCard
      bgcolor="transparent"
      style={{ outline: "none", marginBottom: theme.space.md }}
    >
      <div style={{ paddingTop: theme.space.sm }}>
        <HvTypography variant="label">{title}</HvTypography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: theme.space.sm,
          }}
        >
          {children}
        </div>
      </div>
    </HvCard>
  );
};
