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
    <HvCard
      selectable
      selected={selected}
      bgcolor="bgContainer"
      onClick={() => setSelected((p) => !p)}
      className="w-full text-left hover:cursor-pointer"
    >
      <HvCardHeader
        title={
          <div className="flex justify-start items-center gap-sm">
            <HvCheckBox
              checked={selected}
              value="value"
              aria-label="Tick to select the card."
              onClick={(event) => {
                event.stopPropagation();
                setSelected((p) => !p);
              }}
            />
            <div className="flex gap-xs items-center">
              <HvStatusIcon
                customIcon={<div className="i-ph-tree-structure" />}
                variant="default"
              />
              <HvTypography variant="title4">Title</HvTypography>
            </div>
          </div>
        }
      />
      <HvCardContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu lacus
        ante. Maecenas bibendum semper sapien. Donec a velit mauris. In
        sagittis, dolor nec rhoncus pretium, ligula quam scelerisque magna, eu
        molestie erat enim viverra felis.
      </HvCardContent>
    </HvCard>
  );
}
