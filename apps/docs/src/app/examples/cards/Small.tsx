import { useState } from "react";
import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvStatusIcon,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [selected, setSelected] = useState(false);

  return (
    <HvCard selectable selected={selected} bgcolor="bgContainer">
      <button
        type="button"
        onClick={() => setSelected((p) => !p)}
        aria-label="Press enter or space to select the card."
        className="w-full text-left hover:cursor-pointer"
      >
        <HvCardHeader
          title={<HvTypography variant="title4">Title</HvTypography>}
          icon={
            <HvStatusIcon
              customIcon={<div className="i-ph-tree-structure" />}
              variant="default"
            />
          }
        />
        <HvCardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu
          lacus ante. Maecenas bibendum semper sapien. Donec a velit mauris. In
          sagittis, dolor nec rhoncus pretium, ligula quam scelerisque magna, eu
          molestie erat enim viverra felis.
        </HvCardContent>
      </button>
    </HvCard>
  );
}
