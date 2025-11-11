import { useState } from "react";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvCheckBox,
  HvStatusIcon,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="flex">
      <HvCard
        bgcolor="bgContainer"
        className="w-full rounded-round hover:cursor-pointer"
        selectable
        selected={selected}
      >
        <div
          // oxlint-disable-next-line prefer-tag-over-role
          role="button"
          aria-label="Press enter or space to select the Card."
          className="w-full text-left"
          onClick={() => setSelected(!selected)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelected(!selected);
            }
          }}
        >
          <HvCardHeader
            title={
              <div className="flex justify-start items-center">
                <HvCheckBox checked={selected} />
                <div className="flex gap-xs items-center">
                  <HvStatusIcon
                    variant="default"
                    customIcon={<div className="i-ph-gear" />}
                  />
                  <HvTypography variant="title4">Title</HvTypography>
                </div>
              </div>
            }
          />
          <HvCardContent className="pl-lg pt-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            fermentum, sem quis lobortis varius.
          </HvCardContent>
        </div>
      </HvCard>
    </div>
  );
}
