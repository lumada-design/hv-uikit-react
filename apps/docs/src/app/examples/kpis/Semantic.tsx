import {
  HvCard,
  HvCardContent,
  HvColor,
  HvStatusIcon,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

const colors = ["positive", "warning", "negative", "info"] satisfies HvColor[];

export default function Demo() {
  return (
    <div className="grid gap-sm grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {colors.map((color) => (
        <HvCard key={color} statusColor={color} bgcolor="bgContainer">
          <Kpi title="KPI Label" value="10 352" unit="GB" variant={color} />
        </HvCard>
      ))}
    </div>
  );
}

function Kpi({
  title,
  value,
  unit,
  variant,
}: {
  title: React.ReactNode;
  value: React.ReactNode;
  unit: React.ReactNode;
  variant: keyof typeof colorVariantMap;
}) {
  return (
    <HvCardContent className="grid gap-sm pb-xs!">
      <div className="flex items-center gap-xxs">
        <HvStatusIcon size="xs" variant={colorVariantMap[variant]} />
        <span>{title}</span>
      </div>
      <div className="flex items-baseline gap-2px">
        <HvTypography variant="title3">{value}</HvTypography>
        <HvTypography variant="caption2" className="text-textSubtle">
          {unit}
        </HvTypography>
      </div>
    </HvCardContent>
  );
}

const colorVariantMap = {
  positive: "success",
  warning: "warning",
  negative: "error",
  info: "info",
} as const;
