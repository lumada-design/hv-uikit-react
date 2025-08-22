import { useState } from "react";
import {
  HvBaseSwitch,
  HvButtonBase,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

export default function Demo() {
  const [checked, setChecked] = useState(false);

  return (
    <HvButtonBase
      className="items-center gap-xs border-rounded-full p-l-xxs w-74px justify-between h-26px [&:hover_.HvBaseSwitch-root]:bg-transparent [&_.HvBaseSwitch-root:hover]:bg-transparent"
      onClick={() => setChecked((prev) => !prev)}
      component="div"
    >
      <HvTypography>{checked ? "On" : "Off"}</HvTypography>
      <HvBaseSwitch
        checked={checked}
        aria-label="Custom Switch"
        onClick={(e) => e.stopPropagation()}
        onChange={() => setChecked((prev) => !prev)}
      />
    </HvButtonBase>
  );
}
