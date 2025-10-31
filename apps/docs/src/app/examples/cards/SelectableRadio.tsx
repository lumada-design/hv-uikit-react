import { useState } from "react";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvRadio,
  HvStatusIcon,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="flex">
      <HvCard
        bgcolor="bgContainer"
        className="w-full rounded-round"
        selectable
        selected={selected}
      >
        <button
          type="button"
          onClick={() => setSelected(!selected)}
          aria-label="Press enter or space to select the Card."
          className="w-full text-left"
        >
          <HvCardHeader
            title={
              <div className="flex justify-start items-center">
                <HvRadio checked={selected} />
                <div className="flex gap-xxs items-center">
                  <HvStatusIcon
                    variant="default"
                    customIcon={<div className="i-ph-gear" />}
                  />
                  <HvTypography variant="title4">Title</HvTypography>
                </div>
              </div>
            }
          />
          <HvCardContent className="p-l-lg p-t-0 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            fermentum, sem quis lobortis varius.
          </HvCardContent>
        </button>
      </HvCard>
    </div>
  );
}
