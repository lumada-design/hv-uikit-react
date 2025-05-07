import { Info } from "@phosphor-icons/react";
import { HvIconButton, HvTypography } from "@hitachivantara/uikit-react-core";

import { alignmentData } from "./alignmentData";

type AlignmentBadgeProps = {
  component: string;
};

export const AlignmentBadge = ({ component }: AlignmentBadgeProps) => {
  const entry = Object.entries(alignmentData).find(
    ([key]) => key.replace(/ /g, "").toLowerCase() === component.toLowerCase(),
  );

  if (!entry) return null;

  const [, values] = entry;

  const items = [
    ["Pentaho+", values.pentahoPlus || "—"],
    ["DS 5", values.ds5 || "—"],
    ["DS 3", values.ds3 || "—"],
  ];

  return (
    <HvIconButton
      color="primary"
      title={
        <div className="flex flex-col gap-xs w-[100px]">
          <HvTypography variant="label">DS Alignment</HvTypography>
          <div className="border-b-3px border-atmo2 m-xs -mx-sm" />
          {items.map(([name, value]) => (
            <div key={name} className="flex justify-between gap-xs">
              <HvTypography>{name}</HvTypography>
              <HvTypography>{value}</HvTypography>
            </div>
          ))}
        </div>
      }
    >
      <Info size={18} />
    </HvIconButton>
  );
};
