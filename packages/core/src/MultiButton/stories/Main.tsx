import { useState } from "react";
import {
  HvButton,
  HvMultiButton,
  HvMultiButtonProps,
} from "@hitachivantara/uikit-react-core";
import { Abacus, LocationPin, Map } from "@hitachivantara/uikit-react-icons";

export const Main = (props: HvMultiButtonProps) => {
  const [val, setVal] = useState(1);

  return (
    <HvMultiButton style={{ width: "400px" }} {...props}>
      <HvButton
        startIcon={<Map />}
        selected={val === 0}
        onClick={() => setVal(0)}
      >
        Map
      </HvButton>
      <HvButton
        selected={val === 1}
        onClick={() => setVal(1)}
        startIcon={<LocationPin />}
      >
        Satellite
      </HvButton>
      <HvButton
        startIcon={<Abacus />}
        selected={val === 2}
        onClick={() => setVal(2)}
      >
        Abacus
      </HvButton>
    </HvMultiButton>
  );
};
