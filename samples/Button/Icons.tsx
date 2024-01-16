import React from "react";

import { HvButton } from "@hitachivantara/uikit-react-core";
import { Pause, Play, Stop } from "@hitachivantara/uikit-react-icons";

export const Icons = () => {
  return (
    <>
      <div>
        <HvButton icon aria-label="Play" variant="primaryGhost">
          <Play iconSize="M" />
        </HvButton>
        <HvButton icon aria-label="Pause">
          <Pause iconSize="M" />
        </HvButton>
        <HvButton icon disabled aria-label="Stop">
          <Stop iconSize="M" />
        </HvButton>
      </div>
      <div>
        <HvButton startIcon={<Play />} variant="primaryGhost" aria-label="Play">
          Play
        </HvButton>
        <HvButton
          startIcon={<Pause />}
          variant="secondaryGhost"
          aria-label="Pause"
        >
          Pause
        </HvButton>
        <HvButton
          disabled
          startIcon={<Stop />}
          variant="secondaryGhost"
          aria-label="Stop"
        >
          Stop
        </HvButton>
      </div>
      <div>
        <HvButton endIcon={<Play />} variant="primaryGhost" aria-label="Play">
          Play
        </HvButton>
        <HvButton
          endIcon={<Pause />}
          variant="secondaryGhost"
          aria-label="Pause"
        >
          Pause
        </HvButton>
        <HvButton
          endIcon={<Stop />}
          disabled
          variant="secondaryGhost"
          aria-label="Stop"
        >
          Stop
        </HvButton>
      </div>
    </>
  );
};
